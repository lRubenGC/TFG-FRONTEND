import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dc-text-card',
  templateUrl: './dc-text-card.component.html',
  styleUrls: ['./dc-text-card.component.css'],
})
export class DCTextCardComponent implements OnInit {
  //#region INPUTS
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() buttonTitle: string = '';
  @Input() buttonHref: string = '';
  //#endregion INPUTS
  //#region PROPS
  public userId: string | null = null;
  //#endregion PROPS

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
  }

  constructor(private router: Router) {}

  public goTo(): void {
    if (this.buttonHref) {
      this.router.navigate([this.buttonHref]);
    }
  }
}
