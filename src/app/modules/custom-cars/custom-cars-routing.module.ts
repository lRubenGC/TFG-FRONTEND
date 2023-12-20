import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { CustomCarsEditView } from './views/custom-cars-edit/custom-cars-edit.component';
import { CustomCarsListView } from './views/custom-cars-list/custom-cars-list.component';
import { CustomCarsUploadView } from './views/custom-cars-upload/custom-cars-upload.component';

const routes: Routes = [
  {
    path: 'list',
    component: CustomCarsListView,
  },
  {
    path: 'upload',
    component: CustomCarsUploadView,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit',
    component: CustomCarsEditView,
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomCarsRoutingModule {}
