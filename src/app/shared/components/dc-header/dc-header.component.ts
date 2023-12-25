import { Component, HostListener, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Observable, of, switchMap, tap } from 'rxjs';
import { UserData } from 'src/app/modules/auth/models/auth.models';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { LANGUAGE_OPTIONS } from './dc-header.constants';

@Component({
  selector: 'dc-header',
  templateUrl: './dc-header.component.html',
  styleUrls: ['./dc-header.component.scss'],
})
export class DcHeaderComponent {
  //#region USER DATA
  public userData$: Observable<UserData | null> =
    this.authService.isUserLoggedIn$.pipe(
      switchMap((isUserLoggedIn) => {
        if (!isUserLoggedIn) {
          return of(null);
        }
        return this.authService.getUserById().pipe(
          tap((userData) => {
            if (!userData) {
              this.logOut();
            }
          })
        );
      })
    );
  //#endregion USER DATA

  //#region USER MENU SCROLL
  @ViewChild('userMenu', { static: false }) userMenu!: OverlayPanel;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: Event) {
    this.userMenu.hide();
  }
  //#endregion USER MENU SCROLL

  //#region LANGUAGE OPTIONS
  public languageOptions = LANGUAGE_OPTIONS;
  //#endregion LANGUAGE OPTIONS

  //#region SCREEN WIDTH
  public readonly screenWidth = window.innerWidth;
  //#endregion SCREEN WIDTH

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private authService: AuthService
  ) {}

  public changeLanguage(languageSelected: string): void {
    this.translate.use(languageSelected);
    this.languageService.changeLanguage(languageSelected);
  }

  public logOut() {
    localStorage.removeItem('userId');
    localStorage.removeItem('dt-token');
  }
}
