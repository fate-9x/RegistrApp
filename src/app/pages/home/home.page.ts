/** Importaciones de librerias a usar */

import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AnimationController, ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { UserService } from 'src/app/services/user.service';
import { TabsPage } from '../tabs/tabs.page';

// Decorador Componente este indica que el Home Page es un Componente
@Component({
  selector: 'app-home', // Nombre del selector como <input> o <main-page>
  templateUrl: 'home.page.html', // Arhivo HTML de la visual a trabajar
  styleUrls: ['home.page.scss'], // Archivo/s de estilos
})
export class HomePage implements OnDestroy {

  user: any;

  // https://www.npmjs.com/package/angularx-qrcode
  qrCodeString = 'COdigo qr';
  scannedResult: any;
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
  constructor(private activeroute: ActivatedRoute, private router: Router, public toastController: ToastController, private animationCtrl: AnimationController, private userService: UserService) {
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda
      if (this.router.getCurrentNavigation().extras.state) { // Validamos que en la navegacion actual tenga extras
        this.content_visibility = "show";
        this.user = this.router.getCurrentNavigation().extras.state.user; // Si tiene extra rescata lo enviado
        this.getUser();
      }
    });
  }

  getUser() {
    this.user = this.userService.getUsers(this.user.usuario)
  }

  ngOnInit() {
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
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      if (result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
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

}
