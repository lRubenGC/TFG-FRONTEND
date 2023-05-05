import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  landingCards = [
    {
      backgroundImg: '../../../assets/landing_page/basic_bg.png',
      popImg: '../../../assets/landing_page/basic_pop.png',
      linkTo: 'list-basic',
      title: 'Mainline'
    },
    {
      backgroundImg: '../../../assets/landing_page/premium_bg.png',
      popImg: '../../../assets/landing_page/premium_pop.png',
      linkTo: 'list-premium',
      title: 'Premium'
    },
    {
      backgroundImg: '../../../assets/landing_page/custom_bg.png',
      popImg: '../../../assets/landing_page/custom_pop.png',
      linkTo: 'list-custom',
      title: 'Custom'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
