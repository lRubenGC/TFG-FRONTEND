import { Component, HostListener, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Observable, switchMap } from 'rxjs';
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
      switchMap(() => this.authService.getUserById())
    );
  //#endregion USER DATA

  //#region USER MENU SCROLL
  @ViewChild('userMenu', { static: false }) userMenu!: OverlayPanel;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: Event) {
    this.userMenu.hide();
  }
  //#endregion USER MENU SCROLL

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private authService: AuthService
  ) {}

  //#region LANGUAGE OPTIONS
  public languageOptions = LANGUAGE_OPTIONS;
  //#endregion LANGUAGE OPTIONS

  public changeLanguage(languageSelected: string): void {
    this.translate.use(languageSelected);
    this.languageService.changeLanguage(languageSelected);
  }

  public async logOut() {
    localStorage.removeItem('userId');
    localStorage.removeItem('dt-token');
    this.authService.isUserLoggedIn$.next(false);
    window.location.reload();
  }
}
