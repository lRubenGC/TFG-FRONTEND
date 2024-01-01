import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { PremiumCardComponent } from 'src/app/modules/premium-cars/components/premium-card/premium-card.component';
import { DcDividerComponent } from 'src/app/shared/components/dc-divider/dc-divider.component';
import { DcFilterComponent } from 'src/app/shared/components/dc-filter/dc-filter.component';
import { DcScrollToTopComponent } from 'src/app/shared/components/dc-scroll-to-top/dc-scroll-to-top.component';
import { BasicCardComponent } from '../basic-cars/components/basic-card/basic-card.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { SearchResultsPage } from './view/search-results.component';
@NgModule({
  declarations: [SearchResultsPage, UserCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    DcFilterComponent,
    DcDividerComponent,
    ToastModule,
    DcScrollToTopComponent,
    BasicCardComponent,
    PremiumCardComponent,
    RouterModule,
  ],
  providers: [],
})
export class SearchResultsModule {}
