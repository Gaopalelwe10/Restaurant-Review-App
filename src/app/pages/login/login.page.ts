import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userInfo: any = {};


  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private api: ApiService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toaster: ToasterService
  ) {

  }
  login = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email,
      Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$")
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
    ])),

  });

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required!' },
      { type: 'pattern', message: 'Invalid Email!' },
    ],
    'password': [
      { type: 'required', message: 'Password is required!' },
    ],
  };
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  ngOnInit() {
  }

  async loginF() {

    if (this.login.valid) {
      const loading = this.loadingCtrl.create({
        message: 'logging in, Please wait...',
        // showBackdrop: false,
        cssClass: 'custom-loader',
        spinner: "crescent",
      });

      (await loading).present();

      this.api.login(this.userInfo).subscribe(async (data: any) => {
        if (data.success) {
          (await loading).dismiss();
          localStorage.setItem("userInfo", JSON.stringify(data.result) );
          this.navCtrl.navigateForward('home')

        } else {
          (await loading).dismiss();
          this.presentAlert(data.msg);
        }
      });

    } else {
      this.validateAllFormFields(this.login);
    }
  }

  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Restaurant Review',
      subHeader: 'Warning',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
