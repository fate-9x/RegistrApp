import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/classes/user';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from '../../services/user.service';
import { AuthGuardService } from '../../services/auth-guard.service';

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

  usuario: ""
  password: ""


  users: User[];
  constructor(private router: Router, public toastController: ToastController, private userService: UserService, private localService: LocalService, private auth: AuthGuardService) { } // Se debe instanciar

  ngOnInit() {

  }
  login() {
    if (this.usuario == "" || this.password == "") {
      return this.presentToast("Porfavor rellene todos los campos");
    }

    else if (this.userService.validateUser(this.usuario, this.password)) {
      let navigationExtras: NavigationExtras = {
        state: {
          user: {
            usuario: this.usuario,
            password: this.password
          } // Al estado se asignamos un objeto con clave y valor
        }
      }
      this.auth.authenticated = true;
      this.router.navigate(['/tabs'], navigationExtras);
    } else {
      this.presentToast('Usuario o contraseña incorrectos');
    }

  }

  resetPassword() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: {
          usuario: this.usuario,
          password: this.password
        } // Al estado se asignamos un objeto con clave y valor
      }
    };
    this.router.navigate(['/resetpassword'], navigationExtras);
  }

  /**
   * validateModel sirve para validar que se ingrese algo en los
   * campos del html mediante su modelo
   */
  async presentToast(msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 2000 //si no viene el parámetro el tiempo es 2000
    });
    toast.present();
  }
}
