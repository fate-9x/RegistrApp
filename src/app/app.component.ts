import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Platform } from '@ionic/angular';
import { AuthGuardService } from './services/auth-guard.service';
import { LocalService } from './services/local.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,private localService: LocalService, private auth: AuthGuardService

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      try {
        this.localService.dbState().subscribe((res) => {
          if (res) {
            this.localService.fetchUser().subscribe(item => {
  
              if (item.length == 1) {
  
                for (let user of item) {
                  let navigationExtras: NavigationExtras = {
                    state: {
                      user: {
                        "username": user.username,
                        "name": user.name
                      }
                    }
                  }
                  this.auth.authenticated = true;
                  this.router.navigate(['/tabs'], navigationExtras);
                }
              }
            })
          }
        })
      } catch (e) {
        console.log(e);
      }
    });
  }
}
