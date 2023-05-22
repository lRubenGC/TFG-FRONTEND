import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-global-notification',
  templateUrl: './global-notification.component.html',
  styleUrls: ['./global-notification.component.css']
})
export class GlobalNotificationComponent implements OnInit {

  @Input() notificationMsg: string = '';

  isNotificationVisible = true;

  constructor(
  ) { }


  ngOnInit(): void {
  }

  disableMsg() {
    this.isNotificationVisible = false;
  }

}
