import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'dc-filter',
  templateUrl: './dc-filter.component.html',
  styleUrls: ['./dc-filter.component.css'],
})
export class DcFilterComponent {
  //#region INPUTS
  @Input() header: string = '';
  @Input() set options(val: string[]) {
    this.optionsSubject.next(val);
  }
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() selectedOption = new EventEmitter<string>();
  //#endregion OUTPUTS

  //#region OPTIONS
  private optionsSubject = new BehaviorSubject<string[]>([]);
  public options$ = this.optionsSubject.asObservable();
  //#endregion OPTIONS

  //#region FORM
  public selectionControl = new FormControl();
  //#endregion FORM

  constructor() {
    this.options$
      .pipe(map((options) => (options.length > 0 ? [options[0]] : null)))
      .subscribe((value) => {
        this.selectionControl.setValue(value, { emitEvent: false });
      });

    this.selectionControl.valueChanges.subscribe((selection) => {
      this.selectedOption.emit(selection);
    });
  }
}
