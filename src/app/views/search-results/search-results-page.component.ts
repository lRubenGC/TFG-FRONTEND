import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SearchResultsService } from './search-results.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.css']
})
export class SearchResultsPageComponent implements OnInit, OnDestroy {

  private routeParamsSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private searchResultsService: SearchResultsService,
  ) { }

  ngOnInit(): void {
    this.routeParamsSubscription = this.route.params.subscribe((params: Params) => {
      this.searchCars(params['query']);
    });
  }

  ngOnDestroy(): void {
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
    }
  }
  

  searchCars(query: string) {
    if (query) {
      this.searchResultsService.getCars(query).subscribe(res => {
        console.log(res);
      })
    }
  }

}
