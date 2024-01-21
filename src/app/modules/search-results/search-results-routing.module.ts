import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckToken } from 'src/app/shared/guards/checkToken.guard';
import { SearchResultsPage } from './view/search-results.component';

const routes: Routes = [
  {
    path: '',
    component: SearchResultsPage,
    canActivate: [CheckToken],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchResultsRoutingModule {}
