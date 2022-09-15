import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {

  user:{
    usuario: "";
  };

  constructor(public toastController: ToastController, private router: Router,) { }

  ngOnInit() {
  }

  mostrarMensaje(){
    

    for (var [usr] of Object.entries(this.user)) {
      //verifico campo vacio
      if (usr == "") {
        
        this.presentToast("Porfavor rellene el campo Usuario.");
        
        return false;
      }
    }
    this.presentToast('Se ha enviado un correo para reestablecer su contraseña.');

    this.router.navigate(['/login']);
      
  }
  async presentToast(msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 4000 //si no viene el parámetro el tiempo es 2000
    });
    toast.present();

  }
}
