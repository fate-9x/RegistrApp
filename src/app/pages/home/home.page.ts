/** Importaciones de librerias a usar */

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Button } from 'protractor';

// Decorador Componente este indica que el Home Page es un Componente
@Component({
  selector: 'app-home', // Nombre del selector como <input> o <main-page>
  templateUrl: 'home.page.html', // Arhivo HTML de la visual a trabajar
  styleUrls: ['home.page.scss'], // Archivo/s de estilos
})
export class HomePage {
  user:any;
  data: any={
    seccion:"",
  }; // Generamos una variable Any (permite cualquier valor)

  clases:any[]=[
    {id:1, asignatura: "Programacion de aplicaciones moviles", seccion:"PGY4121-003D", horarios: ["Lunes 8:40 a 10:50", "Jueves 11:41 a 13:10"]},

    {id:1, asignatura: "Calidad de Software", seccion:"CSY4111-003D", horarios: ["Lunes 11:01 a 12:20", "Jueves 9:30 a 10:50"]},

    {id:1, asignatura: "Ingles Intermedio", seccion:"INI5111-013D", horarios: ["Lunes 12:31 a 13:50", "Martes 9:31 a 10:50", "Miercoles 17:01 a 18:20", "Jueves 14:01 a 15:20"]},
  ]

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
  constructor(private activeroute: ActivatedRoute, private router: Router, public toastController:ToastController) {
    // Se llama a la ruta activa y se obtiene sus parametros mediante una subscripcion
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda
      if (this.router.getCurrentNavigation().extras.state) { // Validamos que en la navegacion actual tenga extras
        this.user = this.router.getCurrentNavigation().extras.state.user; // Si tiene extra rescata lo enviado
         // Muestra por consola lo traido
      }else{this.router.navigate(["/login"])} // Si no tiene extra la navegacion actual navegar al login
    });
  }


  // mostrar(){
  //   if(this.data.nombre!="" && this.data.apellido!=""){
  //     this.presentAlert("Usuario", "Su nombre es: "+this.data.nombre+ " " + this.data.apellido)
  //   }else{
  //     this.presentAlert("Error", "Debe ingresar Nombre y Apellido")
  //   }
  // }

}
