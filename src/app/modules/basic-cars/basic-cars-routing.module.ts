import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicCarsPage } from './view/basic-cars.component';

const routes: Routes = [
  {
    path: '',
    component: BasicCarsPage,
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
export class BasicCarsRoutingModule {}
