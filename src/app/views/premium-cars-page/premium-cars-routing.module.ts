import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PremiumCarsPageComponent } from './premium-cars-page.component';


const routes: Routes = [
    {
      path: '',
      component: PremiumCarsPageComponent
    },
    {
      path: '**',
      redirectTo: ''
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PremiumCarsRoutingModule { }
