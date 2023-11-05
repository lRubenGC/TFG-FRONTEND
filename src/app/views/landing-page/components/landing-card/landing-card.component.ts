import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { landingCardInterface } from 'src/app/models/landingPage.interface';

@Component({
  selector: 'app-landing-card',
  templateUrl: './landing-card.component.html',
  styleUrls: ['./landing-card.component.css'],
})
export class LandingCardComponent implements OnInit {
  @Input() config: landingCardInterface = {
    backgroundImg: '',
    popImg: '',
    linkTo: '',
    title: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goTo(link: string) {
    this.router.navigate([link]);
  }
}
