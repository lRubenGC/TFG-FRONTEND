import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  landingCards = [
    {
      backgroundImg: 'https://w0.peakpx.com/wallpaper/632/776/HD-wallpaper-hotwheels-wall-car-hotwheels-thumbnail.jpg',
      popImg: 'https://i.imgur.com/2u3EXCX.png',
      linkTo: 'basic'
    },
    {
      backgroundImg: 'https://i.ytimg.com/vi/erVXf-9wpNI/maxresdefault.jpg',
      popImg: 'https://i.imgur.com/2u3EXCX.png',
      linkTo: 'premium'
    },
    {
      backgroundImg: 'https://preview.redd.it/swq3kqbgkqh41.jpg?auto=webp&s=4ff33bf4e1b08db0e9bec1754d81721bfb48a90a',
      popImg: 'https://i.imgur.com/2u3EXCX.png',
      linkTo: 'custom'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
