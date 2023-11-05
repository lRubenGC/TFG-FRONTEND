import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicCarsView } from './view/basic-cars.component';

const routes: Routes = [
  {
    path: '',
    component: BasicCarsView,
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
