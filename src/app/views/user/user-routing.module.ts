import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserConfigComponent } from './user-config/user-config.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
    {
      path: 'config',
      component: UserConfigComponent
    },
    {
      path: 'profile/:username',
      component: UserProfileComponent
    },
    {
      path: '**',
      redirectTo: 'config'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
