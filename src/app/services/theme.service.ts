import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private lightThemeEnabled = false;

  setLightTheme(isLightTheme: boolean): void {
    this.lightThemeEnabled = isLightTheme;
    const body = document.body;
    if (isLightTheme) {
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
    }
  }

  isLightTheme(): boolean {
    return this.lightThemeEnabled;
  }
}
