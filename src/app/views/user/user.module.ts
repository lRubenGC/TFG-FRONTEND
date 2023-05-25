import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserConfigComponent } from './user-config/user-config.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserConfigComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class UserModule { }
