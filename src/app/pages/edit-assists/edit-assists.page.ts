import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-edit-assists',
  templateUrl: './edit-assists.page.html',
  styleUrls: ['./edit-assists.page.scss'],
})
export class EditAssistsPage implements OnInit {

  id: number;
  name: string;
  assists: number;
  section: string;

  constructor(private router: Router, private activedroute: ActivatedRoute, private dbservice: LocalService) {
    this.activedroute.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.id = this.router.getCurrentNavigation().extras.state.id;
        this.name = this.router.getCurrentNavigation().extras.state.name;
        this.assists = this.router.getCurrentNavigation().extras.state.assists;
        this.section = this.router.getCurrentNavigation().extras.state.section;
      }
    })
  }
  editar(){
    this.dbservice.updateCourse(this.id, this.name, this.assists, this.section);
    this.router.navigate(['/tabs/assists']);
  }

  ngOnInit() {
  }

}
