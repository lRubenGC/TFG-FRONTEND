import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  landingCards = [
    {
      backgroundImg: '../../../assets/landing_basic.png',
      popImg: '../../../assets/landing_basic_pop.png',
      linkTo: 'basic',
      title: 'Mainline'
    },
    {
      backgroundImg: '../../../assets/landing_premium.png',
      popImg: '../../../assets/landing_premium_pop(2).png',
      linkTo: 'premium',
      title: 'Premium'
    },
    {
      backgroundImg: '../../../assets/landing_custom(0).png',
      popImg: '../../../assets/landing_custom_pop.png',
      linkTo: 'custom',
      title: 'Custom'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
