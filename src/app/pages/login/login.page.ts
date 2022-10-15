import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  /**
   * Se genera el modelo user con dos claves
   * cada clave tiene su valor inicial
   */
  user = {
    usuario: "",
    password: ""
  }
  //variable para indicar el campo que falta
  field: string = "";
  constructor(private router: Router, public toastController: ToastController) { } // Se debe instanciar

  ngOnInit() {
  }
  login() {

    
    if (this.validateModel(this.user)) {
      // Se declara e instancia un elemento de tipo NavigationExtras
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.user // Al estado se asignamos un objeto con clave y valor
        }
      };
      this.router.navigate(['/tabs/home'], navigationExtras); // navegamos hacia el Home y enviamos información adicional
    } else {
      this.presentToast("Rellene el campo: " + this.field);
    }

  }

  resetPassword() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user // Al estado se asignamos un objeto con clave y valor
      }
    };
    this.router.navigate(['/resetpassword'], navigationExtras);
  }

  /**
   * validateModel sirve para validar que se ingrese algo en los
   * campos del html mediante su modelo
   */
  validateModel(model: any) {
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    for (var [key, value] of Object.entries(model)) {
      //verifico campo vacio
      if (value == "") {
        this.field = key;
        return false;
        
      }
    }
    return true;
  }
  async presentToast(msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 2000 //si no viene el parámetro el tiempo es 2000
    });
    toast.present();
  }
}
