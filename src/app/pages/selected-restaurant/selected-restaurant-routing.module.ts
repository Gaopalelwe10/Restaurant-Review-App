import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedRestaurantPage } from './selected-restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedRestaurantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedRestaurantPageRoutingModule {}
