import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from '../../../services/language.service';
import { decodeToken } from 'src/app/helpers/generics';
import { UserService } from '../../../services/user.service';
import { userInterface } from 'src/app/models/user.interface';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  langDropdownOpen = false;
  accDropdownOpen = false;
  userLoggedIn = false;
  user!: userInterface;

  @ViewChild('langDropdown') langDropdown!: ElementRef;
  @ViewChild('accDropdown') accDropdown!: ElementRef;

  constructor(
    private authService: AuthService,
    private elementRef: ElementRef, 
    private languageService: LanguageService,
    private router: Router,
    private translate: TranslateService,
    private userService: UserService,
    ) {}

  ngOnInit(): void {
    // Event for close Dropdowns
    this.elementRef.nativeElement.ownerDocument.body.addEventListener('click', this.onBodyClick.bind(this));

    // Event for display User Dropdown
    this.authService.getUserLoggedIn().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.checkUserLoggedIn();
      }
    })

    // Checks if user is logged for display the Dropdown
    this.checkUserLoggedIn();

  }

  goTo(link: string): void {
    this.router.navigate([link]);
  }

  async goToUserProfile() {
    const tokenDecoded = decodeToken();
    if (tokenDecoded.hasToken && tokenDecoded.userId) {
      const user = await this.userService.getUserData(tokenDecoded.userId);
      const username = user.user.username;
      this.router.navigate([`user/profile/${username}`]);
    }
  }

  // Toggles dropdown received and close others
  toggleDropdown(dropdown: string): void {
    if (dropdown === 'lang') {
      this.langDropdownOpen = !this.langDropdownOpen;
      this.accDropdownOpen = false;
      return;
    }
    
    if (dropdown === 'acc') {
      this.accDropdownOpen = !this.accDropdownOpen;
      this.langDropdownOpen = false;
    }
  }

  // Closes dropdown if clicks in body but not in dropdown
  onBodyClick(event: any): void {
    if (!event.target.classList.contains('dropdown-button')) {
      this.langDropdownOpen = false;
      this.accDropdownOpen = false;
    }
  }

  // Changes language
  toggleLanguage(lang: string): void {
    this.translate.use(lang);
    this.languageService.changeLanguage(lang);
  }

  async checkUserLoggedIn(): Promise<void> {
    const { hasToken, userId } = decodeToken();
    
    if ( hasToken && userId ) {
      try {
        const userData: userInterface = await this.userService.getUserData(userId);
        this.user = userData;
        
        this.userLoggedIn = true;
      } catch (error) {
        console.error(error);
      }
    } else this.userLoggedIn = false;
  }

  logOut() {
    localStorage.removeItem('cw-token');
    this.authService.setUserLoggedIn(false);
    this.checkUserLoggedIn();
    window.location.reload();
  }
  
}
