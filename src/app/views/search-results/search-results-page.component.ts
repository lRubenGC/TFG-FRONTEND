import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchResultsService } from './search-results.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.css']
})
export class SearchResultsPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private searchResultsService: SearchResultsService,
  ) { }

  ngOnInit(): void {
    this.searchCars();
  }
  

  searchCars() {
    const query = this.route.snapshot.paramMap.get('query');
    if (query) {
      this.searchResultsService.getCars(query).subscribe(res => {
        console.log(res);
      })
    }
  }

}
