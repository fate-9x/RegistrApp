import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from '../../services/user.service';
import { AuthGuardService } from '../../services/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string;
  password: string;


  constructor(private router: Router, public toastController: ToastController, private userService: UserService, private localService: LocalService, private auth: AuthGuardService) {

  }
  ngOnInit() {
  }


  async login() {
    if (this.usuario == "" || this.usuario == undefined || this.password == "" || this.password == undefined) {
      return this.presentToast("Porfavor rellene todos los campos");
    } else {

      this.userService.getUsers().subscribe((data) => {


        for (let users of data.alumnos) {

          if (users.username == this.usuario && users.password == this.password) {

            let navigationExtras: NavigationExtras = {
              state: {
                user: {
                  "username": users.username,
                  "name": users.nombre
                }
              }
            }
            this.auth.authenticated = true;
            this.localService.addUsers(users.username, users.nombre);
            this.router.navigate(['/tabs'], navigationExtras);
            return;
          }
        }

        this.auth.authenticated = false;
        this.presentToast('Usuario o contraseña incorrectos');

      })
    }


  }

  resetPassword() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: {
          usuario: this.usuario,
          password: this.password
        } 
      }
    };
    this.router.navigate(['/resetpassword'], navigationExtras);
  }


  async presentToast(msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 4000 //si no viene el parámetro el tiempo es 2000
    });
    toast.present();
  }
}
