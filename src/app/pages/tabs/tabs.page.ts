import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user: any;

  constructor(private activeroute: ActivatedRoute, private router: Router, public toastController: ToastController, private userService: UserService, private localService: LocalService, private auth: AuthGuardService) {
    // Se llama a la ruta activa y se obtiene sus parametros mediante una subscripcion
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda
      if (this.router.getCurrentNavigation().extras.state) { // Validamos que en la navegacion actual tenga extras
        this.user = this.router.getCurrentNavigation().extras.state.user; // Si tiene extra rescata lo enviado
        let navigationExtras: NavigationExtras = {
          state: {
            user: this.user // Al estado se asignamos un objeto con clave y valor
          }
        }

        this.router.navigate(['/tabs/home'], navigationExtras) // Navegamos a la ruta home

      }
    });
  }

  ngOnInit() {
  }

}
