import { Component, Input, Output, EventEmitter } from '@angular/core';
import { basicGlobalGroup } from 'src/app/models/cardTypes.interface';


@Component({
  selector: 'app-basic-group',
  templateUrl: './basic-group.component.html',
  styleUrls: ['./basic-group.component.css', '../../../styles/cars-views.css']
})
export class BasicGroupComponent {

  @Input() groups!: basicGlobalGroup[];
  @Output() errorEvent = new EventEmitter<any>();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  enableErrorMsg(ev: any) {
    this.errorEvent.emit(ev);
  }

    
}
