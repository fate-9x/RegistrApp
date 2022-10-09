import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {

  user = {
    usuario: "",
  };

  constructor(public toastController: ToastController, private router: Router,) { }

  ngOnInit() {
  }

  mostrarMensaje() {

    if (this.validateModel(this.user)) {
      this.presentToast('Se ha enviado un correo para reestablecer su contraseña.');
      this.router.navigate(['/login']);
    } else {
      this.presentToast("Porfavor, rellene el campo vacio.");
    }
  }

  validateModel(model: any) {
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    for (var [field, value] of Object.entries(model)) {
      //verifico campo vacio
      if (value == "" || value == null || value == undefined || value == " ") {
        return false;
      }
      console.log(value);
    }
    return true;
  }
  async presentToast(msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 4000 //si no viene el parámetro el tiempo es 2000
    });
    toast.present();

  }
}
