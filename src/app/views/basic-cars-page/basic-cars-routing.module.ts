import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicCarsPageComponent } from './basic-cars-page.component';


const routes: Routes = [
    {
      path: '',
      component: BasicCarsPageComponent
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
export class BasicCarsRoutingModule { }
