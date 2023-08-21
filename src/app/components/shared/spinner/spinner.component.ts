import { Component, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})


export class SpinnerComponent implements OnDestroy {

  isLoading = false;
  private loadingSub: Subscription;

  constructor(private loaderService: LoaderService) {
    this.loadingSub = this.loaderService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }
}
