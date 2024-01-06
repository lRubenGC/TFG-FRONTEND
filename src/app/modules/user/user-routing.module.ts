import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { CheckToken } from 'src/app/shared/guards/checkToken.guard';
import { UserEditView } from './views/user-edit/user-edit.component';
import { UserProfileView } from './views/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'profile/:username',
    component: UserProfileView,
    canActivate: [CheckToken],
  },
  {
    path: 'edit',
    component: UserEditView,
    canActivate: [AuthGuard, CheckToken],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
