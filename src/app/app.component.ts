import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from '../environments/environment';
import { initializeDB } from './helpers/indexedDB';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  appTitle = 'diecast-tracker';

  constructor(
    private translate: TranslateService,
    private primengConfig: PrimeNGConfig
  ) {
    this.initializeDB();

    const lang = localStorage.getItem('dt-lang');
    if (lang) {
      this.translate.setDefaultLang(lang);
    } else this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    console.log(`Version: ${environment.appVersion}`);
    this.primengConfig.zIndex = {
      modal: 6000,
      toast: 7000,
    };
  }

  async initializeDB() {
    try {
      await initializeDB();
    } catch (err) {
      console.error(err);
    }
  }
}
