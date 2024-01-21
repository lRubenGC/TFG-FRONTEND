import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  private languageChangedSource = new Subject<string>();

  languageChanged$ = this.languageChangedSource.asObservable();

  changeLanguage(lang: string) {
    localStorage.setItem('dt-lang', lang);
    this.languageChangedSource.next(lang);
  }
}
