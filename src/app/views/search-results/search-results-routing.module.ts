import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsPageComponent } from './search-results-page.component';


const routes: Routes = [
    {
      path: '',
      component: SearchResultsPageComponent
    },
    {
      path: '**',
      redirectTo: ''
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchResultsRoutingModule { }
