import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailedCarPageComponent } from './detailed-car-page.component';


const routes: Routes = [
    {
      path: '',
      component: DetailedCarPageComponent
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
export class DetailedCarRoutingModule { }
