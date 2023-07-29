import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';

import { SearchResultsPageComponent } from './search-results-page.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    SearchResultsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    ComponentsModule,
  ]
})
export class SearchResultsPageModule { }
