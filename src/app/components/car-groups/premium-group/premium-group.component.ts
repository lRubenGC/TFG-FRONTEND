import { Component, Input, Output, EventEmitter } from '@angular/core';
import { premiumGlobalGroup } from 'src/app/models/cardTypes.interface';

@Component({
  selector: 'app-premium-group',
  templateUrl: './premium-group.component.html',
  styleUrls: ['./premium-group.component.css'],
})
export class PremiumGroupComponent {
  @Input() groups!: premiumGlobalGroup[];
  @Output() errorEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  enableErrorMsg(ev: any) {
    this.errorEvent.emit(ev);
  }
}
