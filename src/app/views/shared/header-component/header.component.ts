import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from '../../../services/language.service';
import { decodeToken } from 'src/app/helpers/generics';
import { UserService } from '../../../services/user.service';
import { userInterface } from 'src/app/models/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  dropdownOpen = false;
  userLoggedIn = false;
  user!: userInterface;

  @ViewChild('headerDropdown') headerDropdown!: ElementRef;

  constructor(
    private router: Router,
    private elementRef: ElementRef, 
    private translate: TranslateService,
    private languageService: LanguageService,
    private userService: UserService
    ) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.addEventListener('click', this.onBodyClick.bind(this));
    this.toggleAccount();
  }

  goTo(link: string): void {
    this.router.navigate([link]);
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  // Closes dropdown if clicks in body but not in dropdown
  onBodyClick(event: any): void {  
    if (event.target.id !== 'dropdown-button') {
      this.closeDropdown();
    }
  }

  toggleLanguage(lang: string): void {
    this.translate.use(lang);
    this.languageService.changeLanguage(lang);
  }

  async toggleAccount(): Promise<void> {
    const { hasToken, userId } = decodeToken();
  
    if (hasToken && userId) {
      try {
        const userData: userInterface = await this.userService.getUserData(userId).toPromise();
        this.user = userData;
        
        this.userLoggedIn = true;
      } catch (error) {
        console.log(error);
      }
    }
  }
  
}
