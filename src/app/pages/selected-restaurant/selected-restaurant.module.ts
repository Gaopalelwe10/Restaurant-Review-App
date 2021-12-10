import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedRestaurantPageRoutingModule } from './selected-restaurant-routing.module';

import { SelectedRestaurantPage } from './selected-restaurant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedRestaurantPageRoutingModule
  ],
  declarations: [SelectedRestaurantPage]
})
export class SelectedRestaurantPageModule {}
