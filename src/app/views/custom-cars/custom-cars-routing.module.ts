import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomCarsPageComponent } from './custom-cars-page/custom-cars-page.component';
import { UploadCustomCarPageComponent } from './upload-custom-car-page/upload-custom-car-page.component';
import { CustomCarDetailedComponent } from './custom-car-detailed/custom-car-detailed.component';
import { EditCustomCarComponent } from './edit-custom-car/edit-custom-car.component';


const routes: Routes = [
    {
      path: '',
      component: CustomCarsPageComponent
    },
    {
      path: 'upload',
      component: UploadCustomCarPageComponent
    },
    {
      path: 'car/:carId',
      component: CustomCarDetailedComponent
    },
    {
      path: 'edit/:carId',
      component: EditCustomCarComponent
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
export class CustomCarsRoutingModule { }
