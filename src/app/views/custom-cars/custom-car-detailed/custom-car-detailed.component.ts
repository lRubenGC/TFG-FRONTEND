import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-car-detailed',
  templateUrl: './custom-car-detailed.component.html',
  styleUrls: ['./custom-car-detailed.component.css']
})
export class CustomCarDetailedComponent implements OnInit {

  error = false;
  errorMsg = '';

  constructor(
  ) { }

  ngOnInit(): void {
  }
  

  enableErrorMsg(msg: string | any) {
    this.error = true;
    if (typeof msg === 'string') {
      this.errorMsg = msg;
    } else {
      this.errorMsg = 'GN_UNEXPECTED_ERROR';
    }
  }

}
