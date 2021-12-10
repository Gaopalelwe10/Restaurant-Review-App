import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#ebb03e');
      this.splashScreen.hide();
    
    });
  }
  user
  async ngOnInit() {
    this.user=JSON.parse(localStorage.getItem("userInfo"));
   
    
    if (this.user !=null) {
      this.router.navigateByUrl("/home");
    } else {
      this.router.navigateByUrl("/login");
    }
  }
}
