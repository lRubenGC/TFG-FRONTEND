import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TFG-FRONTEND';

  constructor(
      private translate: TranslateService,
      private appService: AppService,
    ) {
    const lang = localStorage.getItem('cw-lang');
    if (lang) {
      translate.setDefaultLang(lang)
    } else translate.setDefaultLang('en');
  }
  
  onBodyClick(event: MouseEvent): void {
    this.appService.onBodyClick(event);
  }

}