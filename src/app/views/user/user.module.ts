import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserConfigComponent } from './user-config/user-config.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserConfigComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
