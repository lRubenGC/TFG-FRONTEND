import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { premiumPillInterface } from 'src/app/models/premium.interface';

@Component({
  selector: 'app-premium-pill',
  templateUrl: './premium-pill.component.html',
  styleUrls: ['./premium-pill.component.css']
})
export class PremiumPillComponent implements OnInit {

  @Input() data!: premiumPillInterface;

  @Output() serieSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  showPremiumCars(serie: string) {
    this.serieSelected.emit(serie);
  }

}
