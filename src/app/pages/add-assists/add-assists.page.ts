import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-add-assists',
  templateUrl: './add-assists.page.html',
  styleUrls: ['./add-assists.page.scss'],
})
export class AddAssistsPage implements OnInit {

  name = ""
  assists = ""
  section = ""


  constructor(private localService: LocalService, private router: Router
  ) { }

  ngOnInit() {
  }

  saveCourse() {
    if (this.name != undefined || this.assists != undefined || this.section != undefined) {
      this.localService.addCourse(this.name, this.assists, this.section);
      this.clear();
      this.router.navigate(['/tabs/assists'])
    } else {
      this.localService.presentToast("Debe llenar todos los campos");
    }
  }
  clear() {
    this.name = "";
    this.assists = "";
    this.section = "";
  }

}
