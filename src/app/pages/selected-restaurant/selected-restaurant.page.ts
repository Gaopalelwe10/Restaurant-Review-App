import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ActionSheetController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AddReviewPage } from '../add-review/add-review.page';

@Component({
    selector: 'app-selected-restaurant',
    templateUrl: './selected-restaurant.page.html',
    styleUrls: ['./selected-restaurant.page.scss'],
})
export class SelectedRestaurantPage implements OnInit {
    Segment = "Reviews"
    restaurantInfo: any;
    reviews: any = []
    userInfo: any;
    constructor(
        public api: ApiService,
        private actionsheetCtrl: ActionSheetController,
        private navC: NavController,
        private modalCtrl: ModalController,
        private loadingCtrl: LoadingController
    ) {
        this.restaurantInfo = this.api.restaurantsData
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));

        this.init()
    }

    ngOnInit() {
    }

    init() {
        let body = {
            id: Number(this.restaurantInfo.id)
        }
        this.api.getReviews(body).subscribe(async (data: any) => {
            if (data.success) {
                this.reviews = data.result
            } else {

            }
        });
    }

    async openMenuGroup(item) {
        let actionSheet = this.actionsheetCtrl.create({
            //   header: '',
            cssClass: 'action-sheets-style',
            buttons: [
                {
                    text: 'Update',
                    icon: 'create-outline',
                    handler: () => {
                        this.update(item)
                        console.log(item)
                    }
                },

                {
                    text: 'Delete',
                    icon: 'trash',
                    handler: () => {
                        this.delete(item)
                    }
                }
            ]
        });
        (await actionSheet).present();
    }


    async add() {
        const modal = await this.modalCtrl.create({
            component: AddReviewPage,

            componentProps: {

                isUpdate: false,
                userID: this.userInfo.id,
                restID: this.restaurantInfo.id
            },
        });

        modal.onDidDismiss().then(data => {
            console.log(data)
            if (data.data != 'close') {
                this.init()
            }

        });

        return await modal.present();
    }

    async update(data) {

        const modal = await this.modalCtrl.create({
            component: AddReviewPage,

            componentProps: {
                data: JSON.stringify(data),
                isUpdate: true,
                userID: this.userInfo.id,
                restID: this.restaurantInfo.id

            },
        });

        modal.onDidDismiss().then(data => {
            console.log(data)
            if (data.data != 'close') {
                this.init()
            }

        });

        return await modal.present();
    }


    async delete(item) {

        const loading = this.loadingCtrl.create({
            message: 'Deleting , Please wait...',
            // showBackdrop: false,
            cssClass: 'custom-loader',
            spinner: "crescent",
        });

        (await loading).present();

        let body = {
            review_id: Number(item.review_id)
        }
        this.api.deleteReview(body).subscribe(async (data: any) => {

            console.log(data);
            if (data.success) {
                (await loading).dismiss();
                this.init()
                // this.toaster.successToast("success");

            } else {
                (await loading).dismiss();
                // this.presentAlert(data.msg);
            }
        });
    }
}
