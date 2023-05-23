import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './views/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  { 
    path: 'auth',
    loadChildren: () => import('./views/auth/auth-routing.module').then(m => m.AuthRoutingModule)
  },
  { 
    path: 'basic-cars',
    loadChildren: () => import('./views/basic-cars-page/basic-cars-routing.module').then(m => m.BasicCarsRoutingModule)
  },
  { 
    path: 'custom-cars',
    loadChildren: () => import('./views/custom-cars/custom-cars-routing.module').then(m => m.CustomCarsRoutingModule)
  },
  { 
    path: 'premium-cars',
    loadChildren: () => import('./views/premium-cars-page/premium-cars-routing.module').then(m => m.PremiumCarsRoutingModule)
  },
  { 
    path: 'search/:query',
    loadChildren: () => import('./views/search-results/search-results-routing.module').then(m => m.SearchResultsRoutingModule)
  },
  { 
    path: 'user',
    loadChildren: () => import('./views/user/user-routing.module').then(m => m.UserRoutingModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
