import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-about-cw',
  templateUrl: './about-cw-page.component.html',
  styleUrls: ['./about-cw-page.component.css']
})
export class AboutCWPageComponent {

  constructor(
    private loaderService: LoaderService,
  ) {}

  ngAfterContentInit() {
    this.loaderService.stopLoading();
  }

}
