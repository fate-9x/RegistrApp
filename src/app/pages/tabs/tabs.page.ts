import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user: any;
  data: any = {
    seccion: "",
  };

  constructor(private activeroute: ActivatedRoute, private router: Router, public toastController: ToastController, private animationCtrl: AnimationController) {
    // Se llama a la ruta activa y se obtiene sus parametros mediante una subscripcion
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda
      if (this.router.getCurrentNavigation().extras.state) { // Validamos que en la navegacion actual tenga extras
        this.user = this.router.getCurrentNavigation().extras.state.user; // Si tiene extra rescata lo enviado
        // Muestra por consola lo traido
      } else { this.router.navigate(["/login"]) } // Si no tiene extra la navegacion actual navegar al login
    });
  }

  ngOnInit() {
  }

}
