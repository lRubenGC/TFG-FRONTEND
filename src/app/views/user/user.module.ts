import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserConfigComponent } from './user-config/user-config.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserConfigComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    TranslateModule,
  ]
})
export class UserModule { }
