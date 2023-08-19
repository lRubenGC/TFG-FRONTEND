import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-dc-button',
  templateUrl: './dc-button.component.html',
  styleUrls: ['./dc-button.component.css']
})
export class DCButtonComponent {

  @Input() buttonTitle: string = '';

  isNotificationVisible = true;

  constructor(
  ) { }

}
