/** Importaciones de librerias a usar */

import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { LocalService } from 'src/app/services/local.service';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer/ngx';

// Decorador Componente este indica que el Home Page es un Componente
@Component({
  selector: 'app-home', // Nombre del selector como <input> o <main-page>
  templateUrl: 'home.page.html', // Arhivo HTML de la visual a trabajar
  styleUrls: ['home.page.scss'], // Archivo/s de estilos
})
export class HomePage implements OnDestroy {

  user: any;

  // https://www.npmjs.com/package/angularx-qrcode
  scanning = false;
  qrCodeString = 'COdigo qr';
  scannedResult: string;
  content_visibility = '';
  // Generamos una variable Any (permite cualquier valor)

  // niveles:any[]=[
  //   {id:1,nivel:"Basica Incompleta"},
  //   {id:2,nivel:"Basica Completa"},
  //   {id:3,nivel:"Media Incompleta"},
  //   {id:4,nivel:"Media Completa"},
  //   {id:5,nivel:"Superior Incompleta"},
  //   {id:6,nivel:"Superior Completa"}
  // ]
  /**
   * En el constructor del HomePage se colocan por parametros
   * todas aquellas propiedades con el siguiente formato
   * private = visibilidad
   * activeRoute = identificador
   * ActiveRoute = Tipo de Objeto
   * : Indica que el identificador sera de la clase posterior a los : puntos
   * 
   */
  constructor(private activeroute: ActivatedRoute, private router: Router, public toastController: ToastController, private localService: LocalService, private auth: AuthGuardService, private emailComposer: EmailComposer) {
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda
      if (this.router.getCurrentNavigation().extras.state) { // Validamos que en la navegacion actual tenga extras
        this.content_visibility = "show";
        this.user = this.router.getCurrentNavigation().extras.state.user; // Si tiene extra rescata lo enviado

        console.log("AAAAAA: " + this.user.name);

      }
    });
  }

  ngOnInit() {
  }


  async openEmail() {

    let result = JSON.parse(this.scannedResult);

    if(result.correo != "") {
      const email = {
        app: 'gmail',
        to: result.correo,
        subject: 'Asistencia QR',
        body: 'Mensaje de prueba'
      };
  
      this.emailComposer.open(email);
    }
  }


  // startScan() {
  //   this.barcodeScanner.scan().then(barcodeData => {
  //     console.log('Barcode data', barcodeData);
  //     this.scannedResult = barcodeData?.text;
  //    }).catch(err => {
  //        console.log('Error', err);
  //    });
  // }

  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      this.scanning = true;
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.scanning = false;
      this.content_visibility = '';
      if (result?.hasContent) {
        this.scannedResult = result.content;
        this.openEmail();
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    this.scanning = false;
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
  }

  logout() {
    if (this.localService.deleteUser(this.user.username)) {
      this.auth.authenticated = false;
      this.router.navigate(['/login']);
    } else {
      this.presentToast("Error al cerrar sesion");
    }
  }

  ngOnDestroy(): void {
    this.stopScan();
  }
  // mostrar(){
  //   if(this.data.nombre!="" && this.data.apellido!=""){
  //     this.presentAlert("Usuario", "Su nombre es: "+this.data.nombre+ " " + this.data.apellido)
  //   }else{
  //     this.presentAlert("Error", "Debe ingresar Nombre y Apellido")
  //   }
  // }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
