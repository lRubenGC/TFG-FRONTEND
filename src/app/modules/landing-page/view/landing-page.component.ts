import { Component } from '@angular/core';
import { LANDING_CARDS, TEXT_CARD } from '../models/landing-page.constants';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  //#region CONSTANTS
  public readonly LANDING_CARDS = LANDING_CARDS;
  public readonly TEXT_CARD = TEXT_CARD;
  //#endregion CONSTANTS
}
