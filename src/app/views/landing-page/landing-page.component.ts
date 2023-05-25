import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { lastValueFrom, Subscription } from 'rxjs';

import { LanguageService } from "../../services/language.service";
import { landingCardInterface } from 'src/app/models/landingPage.interface';
import { msgCardInterface } from 'src/app/models/shared.interface';
import { decodeToken } from 'src/app/helpers/generics';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  userLoggedIn = decodeToken().hasToken;

  landingCards: landingCardInterface[] = [
    {
      backgroundImg: '../../../assets/images/landing_page/basic_bg.png',
      popImg: '../../../assets/images/landing_page/basic_pop.png',
      linkTo: 'basic-cars',
      title: 'Basic'
    },
    {
      backgroundImg: '../../../assets/images/landing_page/premium_bg.png',
      popImg: '../../../assets/images/landing_page/premium_pop.png',
      linkTo: 'premium-cars',
      title: 'Premium'
    },
    {
      backgroundImg: '../../../assets/images/landing_page/custom_bg.png',
      popImg: '../../../assets/images/landing_page/custom_pop.png',
      linkTo: 'custom-cars',
      title: 'Custom'
    }
  ]

  msg_card: msgCardInterface = {
    title: '',
    description: [],
    button: !this.userLoggedIn,
    buttonName: '',
    buttonLink: '/auth'
  }

  private subscription!: Subscription;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
  ) {}

  ngOnInit() {
    this.subscription = this.languageService.languageChanged$.subscribe(lang => {
      this.translate.use(lang);
      this.changeLanguage();
    })

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

