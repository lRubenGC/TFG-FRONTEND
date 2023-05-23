import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TFG-FRONTEND';

  constructor(private translate: TranslateService) {
    const lang = localStorage.getItem('cw-lang');
    if (lang) {
      translate.setDefaultLang(lang)
    } else translate.setDefaultLang('en');
  }
  

}