import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from './header-component/header.component';
import { MsgCardComponent } from './msg-card/msg-card.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MsgCardComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    MsgCardComponent,
    SpinnerComponent,
  ]
})
export class SharedModule { }
