import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing-page/view/landing-page.component';
import { CheckToken } from './shared/guards/checkToken.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [CheckToken],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth-routing.module').then(
        (m) => m.AuthRoutingModule
      ),
  },
  {
    path: 'basic-cars',
    loadChildren: () =>
      import('./modules/basic-cars/basic-cars-routing.module').then(
        (m) => m.BasicCarsRoutingModule
      ),
  },
  {
    path: 'custom-cars',
    loadChildren: () =>
      import('./modules/custom-cars/custom-cars-routing.module').then(
        (m) => m.CustomCarsRoutingModule
      ),
  },
  {
    path: 'premium-cars',
    loadChildren: () =>
      import('./modules/premium-cars/premium-cars-routing.module').then(
        (m) => m.PremiumCarsRoutingModule
      ),
  },
  {
    path: 'search/:query',
    loadChildren: () =>
      import('./modules/search-results/search-results-routing.module').then(
        (m) => m.SearchResultsRoutingModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user-routing.module').then(
        (m) => m.UserRoutingModule
      ),
  },
  {
    path: 'privacy-policies',
    loadChildren: () =>
      import('./modules/google/privacy-policies/google-routing.module').then(
        (m) => m.GoogleRoutingModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
