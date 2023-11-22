import { Component, HostListener, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Observable, from, of, switchMap } from 'rxjs';
import { GenericAuthService } from 'src/app/services/generic-auth.service';
import { LanguageService } from 'src/app/services/language.service';
import { UserSharedService } from 'src/app/shared/services/user-shared.service';
import { AuthService } from 'src/app/views/auth/auth.service';
import {
  decodeToken,
  removeTokenFromIndexedDB,
} from '../../functions/token-functions';
import { userIdToken } from '../../models/token-shared.models';
import { UserData } from '../../models/user-shared.models';
import { LANGUAGE_OPTIONS } from './dc-header.constants';

@Component({
  selector: 'dc-header',
  templateUrl: './dc-header.component.html',
  styleUrls: ['./dc-header.component.scss'],
})
export class DcHeaderComponent {
  //#region USER DATA
  public userData$: Observable<UserData | null> = from(decodeToken()).pipe(
    switchMap((userIdToken: userIdToken) => {
      if (userIdToken && userIdToken.userId) {
        return from(this.userSharedService.getUserById(userIdToken.userId));
      } else return of(null);
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

  constructor(
    private userSharedService: UserSharedService,
    private languageService: LanguageService,
    private translate: TranslateService,
    private authService: AuthService,
    private genericAuthService: GenericAuthService
  ) {}

  //#region LANGUAGE OPTIONS
  public languageOptions = LANGUAGE_OPTIONS;
  //#endregion LANGUAGE OPTIONS

  public changeLanguage(languageSelected: string): void {
    this.translate.use(languageSelected);
    this.languageService.changeLanguage(languageSelected);
  }

  public async logOut() {
    this.genericAuthService.logout();

    await removeTokenFromIndexedDB();
    this.authService.setUserLoggedIn(false);
    window.location.reload();
  }
}
