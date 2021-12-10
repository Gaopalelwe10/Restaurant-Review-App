import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, } from '@ionic/angular';
import { ApiService } from '../services/api.service';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    restaurants: any = []
    constructor(
        private navC: NavController,
        private api: ApiService
    ) {


        this.api.getRestaurants().subscribe(async (data: any) => {
            if (data.success) {
                this.restaurants = data.result
            } else {

            }
        });
    }

    ngOnInit() {
    }

    goToSelectedRestaurant(data) {
        this.navC.navigateForward('selected-restaurant')
        this.api.restaurantsData =data
    }


    logout(){
        localStorage.removeItem('userInfo')
        this.navC.navigateForward("/login")
    }
}
