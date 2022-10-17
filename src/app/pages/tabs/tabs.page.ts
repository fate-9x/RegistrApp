import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user: any;

  constructor(private activeroute: ActivatedRoute, private router: Router, public toastController: ToastController, private animationCtrl: AnimationController) {
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
