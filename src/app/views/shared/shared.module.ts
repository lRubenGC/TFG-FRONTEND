import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header-component/header.component';
import { MsgCardComponent } from './msg-card/msg-card.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MsgCardComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    MsgCardComponent,
  ]
})
export class SharedModule { }
