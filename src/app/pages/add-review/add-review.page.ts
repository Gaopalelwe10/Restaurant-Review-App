import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.page.html',
  styleUrls: ['./add-review.page.scss'],
})
export class AddReviewPage implements OnInit {
  rate: any = 2;
  msg: any = '';
  name: any;
  isUpdate
  userID
  restID
  review_id
  constructor(
    private route: ActivatedRoute,
    public api: ApiService,
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private toaster: ToasterService
  ) {

    this.isUpdate = this.navParams.get('isUpdate');
    this.userID = this.navParams.get('userID');
    this.restID = this.navParams.get('restID');

    if (this.isUpdate == true) {
      let updateData = JSON.parse(this.navParams.get('data'))
      this.rate = updateData.rating
      this.msg = updateData.msg
      this.review_id =updateData.review_id
    }

  }

  ngOnInit() {
  }

  onClick(val) {
    this.rate = val;
  }

  onChange(val) {
    console.log(val);
  }

  async submit() {


    const loading = this.loadingCtrl.create({
      message: 'Loading, Please wait...',
      // showBackdrop: false,
      cssClass: 'custom-loader',
      spinner: "crescent",
    });

    (await loading).present();



    if (this.isUpdate == true) {
      let body = {
        msg: this.msg,
        rating: Number(this.rate),
        review_id : Number(this.review_id)
      }
      this.api.updateReview(body).subscribe(async (data: any) => {
        if (data.success) {
          (await loading).dismiss();
          this.toaster.successToast("success");
          this.modalCtrl.dismiss("done");
        } else {
          (await loading).dismiss();
          // this.presentAlert(data.msg);
        }
      });
    }else{
      let body = {
        msg: this.msg,
        rating: Number(this.rate),
        userID: Number(this.userID),
        restID: Number(this.restID),
      }
      this.api.addReview(body).subscribe(async (data: any) => {

        console.log(data);
        if (data.success) {
          (await loading).dismiss();
          this.toaster.successToast("success");
          this.modalCtrl.dismiss("done");
        } else {
          (await loading).dismiss();
          // this.presentAlert(data.msg);
        }
      });
    }
  }

  close() {
    this.modalCtrl.dismiss("close");
  }
}
