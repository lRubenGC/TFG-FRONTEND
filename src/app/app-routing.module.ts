import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { BasicCarsPageComponent } from './views/basic-cars-page/basic-cars-page.component';
import { PremiumCarsPageComponent } from './views/premium-cars-page/premium-cars-page.component';
import { CustomCarsPageComponent } from './views/custom-cars/custom-cars-page/custom-cars-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'list-basic', component: BasicCarsPageComponent },
  { path: 'list-premium', component: PremiumCarsPageComponent },
  { path: 'list-custom', component: CustomCarsPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
