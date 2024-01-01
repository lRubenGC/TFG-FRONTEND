import { Component, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Observable, of, switchMap, tap } from 'rxjs';
import { USER_DATA } from 'src/app/modules/auth/models/auth.models';
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
  public userData$: Observable<USER_DATA | null> =
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

  //#region SEARCH BAR FORM
  public searchBarForm: FormGroup = this.fb.group({
    search_input: ['', Validators.required],
  });
  public searchInput() {
    if (this.searchBarForm.valid) {
      const search_input = this.searchBarForm.value.search_input;
      this.router.navigate([`/search/${search_input}`]);
    }
  }
  //#endregion SEARCH BAR FORM

  //#region LANGUAGE OPTIONS
  public languageOptions = LANGUAGE_OPTIONS;
  //#endregion LANGUAGE OPTIONS

  //#region SCREEN WIDTH
  public readonly screenWidth = window.innerWidth;
  //#endregion SCREEN WIDTH

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {}

  public changeLanguage(languageSelected: string): void {
    this.translate.use(languageSelected);
    this.languageService.changeLanguage(languageSelected);
  }

  public logOut() {
    localStorage.removeItem('userId');
    localStorage.removeItem('dt-token');
    location.reload();
  }
}
