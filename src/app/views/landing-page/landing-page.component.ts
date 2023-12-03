import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { lastValueFrom, Subscription } from 'rxjs';

import { landingCardInterface } from 'src/app/models/landingPage.interface';
import { msgCardInterface } from 'src/app/models/shared.interface';
import { LanguageService } from '../../shared/services/language.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  userLoggedIn!: boolean;

  landingCards: landingCardInterface[] = [
    {
      backgroundImg: '../../../assets/images/landing_page/basic_bg.webp',
      popImg: '../../../assets/images/landing_page/basic_pop.webp',
      linkTo: 'basic-cars',
      title: 'SEARCH_BASIC_CARS',
    },
    {
      backgroundImg: '../../../assets/images/landing_page/premium_bg.webp',
      popImg: '../../../assets/images/landing_page/premium_pop.webp',
      linkTo: 'premium-cars',
      title: 'SEARCH_PREMIUM_CARS',
    },
    {
      backgroundImg: '../../../assets/images/landing_page/custom_bg.webp',
      popImg: '../../../assets/images/landing_page/custom_pop.webp',
      linkTo: 'custom-cars',
      title: 'CUSTOM_CARS',
    },
  ];

  msg_card: msgCardInterface = {
    title: '',
    description: [],
    button: false,
    buttonName: '',
    buttonLink: '/auth',
  };

  private subscription!: Subscription;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  async ngOnInit() {
    this.subscription = this.languageService.languageChanged$.subscribe(
      (lang) => {
        this.translate.use(lang);
        this.changeLanguage();
      }
    );

    this.changeLanguage();
  }

  async changeLanguage() {
    const cardTitle = this.translate.get('LANDING_CARD_TITLE');
    this.msg_card.title = await lastValueFrom(cardTitle);

    const cardDescr1 = this.translate.get('LANDING_CARD_DESCRIPTION_1');
    this.msg_card.description[0] = await lastValueFrom(cardDescr1);

    const cardDesc2 = this.translate.get('LANDING_CARD_DESCRIPTION_2');
    this.msg_card.description[1] = await lastValueFrom(cardDesc2);

    const cardDesc3 = this.translate.get('LANDING_CARD_DESCRIPTION_3');
    this.msg_card.description[2] = await lastValueFrom(cardDesc3);

    const cardDescr4 = this.translate.get('LANDING_CARD_DESCRIPTION_4');
    this.msg_card.description[3] = await lastValueFrom(cardDescr4);

    const cardButton = this.translate.get('LANDING_CARD_BUTTON');
    this.msg_card.buttonName = await lastValueFrom(cardButton);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
