import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dc-landing-card',
  templateUrl: './dc-landing-card.component.html',
  styleUrls: ['./dc-landing-card.component.css'],
})
export class DCLandingCardComponent {
  //#region INPUTS
  @Input() title: string = '';
  @Input() backgroundImg: string = '';
  @Input() popImg: string = '';
  @Input() linkTo: string = '';
  //#endregion INPUTS

  constructor(private router: Router) {}

  goTo(link: string) {
    this.router.navigate([link]);
  }
}
