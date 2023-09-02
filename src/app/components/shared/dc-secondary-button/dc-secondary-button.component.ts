import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-dc-secondary-button',
  templateUrl: './dc-secondary-button.component.html',
  styleUrls: ['./dc-secondary-button.component.css']
})
export class DCSecondaryButtonComponent {

  @Input() buttonTitle: string = '';
  @Input() buttonDisabled: boolean = false;


  constructor(
  ) { }

}
