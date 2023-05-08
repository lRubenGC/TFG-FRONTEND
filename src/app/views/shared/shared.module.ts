import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from './header-component/header.component';
import { MsgCardComponent } from './msg-card/msg-card.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MsgCardComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent,
    MsgCardComponent,
  ]
})
export class SharedModule { }
