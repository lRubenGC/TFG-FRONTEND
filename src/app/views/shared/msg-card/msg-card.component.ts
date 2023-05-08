import { Component, Input, OnInit } from '@angular/core';
import { msgCardInterface } from 'src/app/models/shared.interface';

@Component({
  selector: 'app-msg-card',
  templateUrl: './msg-card.component.html',
  styleUrls: ['./msg-card.component.css']
})
export class MsgCardComponent implements OnInit {

  @Input() config: msgCardInterface = {
    title: '',
    description: [''],
    button: false,
    buttonName: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
