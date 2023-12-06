import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PremiumCarsPage } from './view/premium-cars.component';

const routes: Routes = [
  {
    path: '',
    component: PremiumCarsPage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremiumCarsRoutingModule {}
