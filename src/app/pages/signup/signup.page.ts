import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  userInfo: any = {}

  constructor(
    private navCtrl: NavController,
    private api: ApiService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toaster: ToasterService
  ) {
    
  }

  ngOnInit() {
  }

  signUp = new FormGroup({
    firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern("^[A-Za-z-]*$")])),
    lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern("^[A-Za-z-]*$")])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$")])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6),
    Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&].{5,}")
    ])),
    cpassword: new FormControl('', Validators.required)
  }, {
    validators: this.passwordMatcher.bind(this)
  });

  passwordMatcher(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password')
    const { value: cpassword } = formGroup.get('cpassword')
    const matchingControl = formGroup.controls['cpassword'];
    if (matchingControl.errors && !matchingControl.errors.passwordMatcher) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    return password === cpassword ? null : matchingControl.setErrors({ passwordMatcher: true })
  }

  validation_messages = {
    'firstname': [
      { type: 'required', message: 'First Name is required!' },
      { type: 'pattern', message: 'First Name should contain letters and hyphen only!' },
      { type: 'minlength', message: 'First Name should contain atleast 2 letters!' },
    ],
    'lastname': [
      { type: 'required', message: 'Last Name is required!' },
      { type: 'pattern', message: 'Last Name should contain letters and hyphen only!' },
      { type: 'minlength', message: 'Last Name should contain atleast 2 letters!' },
    ],
    'email': [
      { type: 'required', message: 'Email is required!' },
      { type: 'pattern', message: 'Invalid Email!' },
    ],

    'password': [
      { type: 'required', message: 'Password is required!' },
      { type: 'minlength', message: 'Password should contain atleast 6 characters!' },
      { type: 'pattern', message: 'Password should contain characters, numbers, lowercase and uppercase letters!' },
    ],
    'cpassword': [
      { type: 'required', message: 'Confirm password is required!' },
      { type: 'passwordMatcher', message: 'Passwords dont match!' },
    ]
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


  async register() {

    if (this.signUp.valid) {

      const loading = this.loadingCtrl.create({
        message: 'Signing up, Please wait...',
        // showBackdrop: false,
        cssClass: 'custom-loader',
        spinner: "crescent",
      });

      (await loading).present();
      
      this.api.register(this.userInfo).subscribe(async (data: any) => {
      
     
        if (data.success) {
          (await loading).dismiss();
          this.toaster.successToast("success");
          this.navCtrl.navigateForward('login');
        } else {
          (await loading).dismiss();
          this.presentAlert(data.msg);
        }
      });
    } else {
      this.validateAllFormFields(this.signUp);
    }
  }
  goBack() {
    this.navCtrl.back();
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
