import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {

  user:any;

  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  mostrarMensaje(){
    if(this.user != ""){
      this.presentToast('Se ha enviado un correo para reestablecer su contraseña.')
    }else{
      this.presentToast("Porfavor rellene el campo Usuario.")
    }
  }

  async presentToast(msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 4000 //si no viene el parámetro el tiempo es 2000
    });
    toast.present();
  }

}
