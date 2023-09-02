import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates-page.component.html',
  styleUrls: ['./updates-page.component.css', '../info.styles.css']
})
export class UpdatesPageComponent {

  constructor(
    private loaderService: LoaderService,
  ) {}

  ngAfterContentInit() {
    this.loaderService.stopLoading();
  }

}
