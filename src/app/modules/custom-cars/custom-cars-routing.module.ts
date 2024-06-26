import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { CheckToken } from 'src/app/shared/guards/checkToken.guard';
import { CustomCarsEditView } from './views/custom-cars-edit/custom-cars-edit.component';
import { CustomCarsListView } from './views/custom-cars-list/custom-cars-list.component';
import { CustomCarsUploadView } from './views/custom-cars-upload/custom-cars-upload.component';

const routes: Routes = [
  {
    path: 'list',
    component: CustomCarsListView,
    canActivate: [CheckToken],
  },
  {
    path: 'upload',
    component: CustomCarsUploadView,
    canActivate: [AuthGuard, CheckToken],
  },
  {
    path: 'edit',
    component: CustomCarsEditView,
    canActivate: [CheckToken],
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
