import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckToken } from 'src/app/shared/guards/checkToken.guard';
import { PrivacyPoliciesComponent } from './view/privacy-policies.component';

const routes: Routes = [
  {
    path: '',
    component: PrivacyPoliciesComponent,
    canActivate: [CheckToken],
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
export class GoogleRoutingModule {}
