import { Component, Input, OnInit } from '@angular/core';

import { basicCarInterface } from 'src/app/models/cardTypes.interface';

@Component({
  selector: 'app-basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.css', '../car-cards.css']
})
export class BasicCardComponent implements OnInit {

  @Input() car!: basicCarInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
