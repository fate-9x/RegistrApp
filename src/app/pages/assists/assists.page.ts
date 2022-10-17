import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Course } from 'src/app/classes/course';
import { LocalService } from 'src/app/services/local.service';


@Component({
  selector: 'app-assists',
  templateUrl: './assists.page.html',
  styleUrls: ['./assists.page.scss'],
})
export class AssistsPage implements OnInit {

  courses: Course[];
  constructor(private dbService:LocalService ,private router: Router) { }

  ngOnInit() {
    this.dbService.dbState().subscribe((res) => {
      if (res) {
        this.dbService.fetchCourses().subscribe(item => {
          this.courses = item;
        })
      }
    })
  }

  editar(item) {
    
    let navigationExtras: NavigationExtras = {
      state : {
        id: item.id,
        name : item.name,
        assists : item.assists,
        section : item.section
      }
    }
    this.dbService.presentToast("Editar Curso");
    this.router.navigate(['/tabs/edit-assists'],navigationExtras);
  }

  eliminar(item) {
    this.dbService.deleteCourse(item.id);
    this.dbService.presentToast("Curso Eliminado");
  }

}
