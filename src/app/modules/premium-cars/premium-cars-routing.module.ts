import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckToken } from 'src/app/shared/guards/checkToken.guard';
import { PremiumCarsPage } from './view/premium-cars.component';

const routes: Routes = [
  {
    path: '',
    component: PremiumCarsPage,
    canActivate: [CheckToken],
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
