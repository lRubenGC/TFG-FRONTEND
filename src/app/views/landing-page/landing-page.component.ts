import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { lastValueFrom } from 'rxjs';

import { landingCardInterface } from 'src/app/models/landingPage.interface';
import { msgCardInterface } from 'src/app/models/shared.interface';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

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
    button: true,
    buttonName: ''
  }

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('es');
  }

  async ngOnInit() {
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

}

