import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  dropdownOpen = false;

  @ViewChild('headerDropdown') headerDropdown!: ElementRef;

  constructor(
    private router: Router,
    private elementRef: ElementRef, 
    private translate: TranslateService,
    private languageService: LanguageService,
    ) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.addEventListener('click', this.onBodyClick.bind(this));
  }

  returnHome(): void {
    this.router.navigate(['/']);
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
}
