import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from './services/app.service';
import { environment } from "../environments/environment";
import { initializeDB } from './helpers/indexedDB';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appTitle = 'diecast-tracker';

  constructor(
      private translate: TranslateService,
      private appService: AppService,
    ) {
      this.initializeDB();

      const lang = localStorage.getItem('cw-lang');
      if (lang) {
        translate.setDefaultLang(lang)
      } else translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    console.log(`Version: ${environment.appVersion}`);
  }
  
  onBodyClick(event: MouseEvent): void {
    this.appService.onBodyClick(event);
  }

  async initializeDB() {
    try {
      await initializeDB();
    } catch (err) {
      console.error(err);
    }
  }

}