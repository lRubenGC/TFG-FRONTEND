import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [UserCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [UserCardComponent],
})
export class ComponentsModule {}
