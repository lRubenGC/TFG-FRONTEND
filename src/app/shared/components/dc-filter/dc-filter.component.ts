import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'dc-filter',
  standalone: true,
  templateUrl: './dc-filter.component.html',
  styleUrls: ['./dc-filter.component.css'],
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
})
export class DcFilterComponent<T> {
  //#region INPUTS
  @Input() header: string = '';
  @Input() set options(val: string[]) {
    this.optionsSubject.next(val);
  }
  @Input() set filterInit(val: string | null) {
    this.filterInitSubject.next(val);
  }
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() selectedOption = new EventEmitter<T>();
  //#endregion OUTPUTS

  //#region OPTIONS
  private optionsSubject = new BehaviorSubject<string[]>([]);
  public options$ = this.optionsSubject.asObservable();
  //#endregion OPTIONS

  //#region FORM
  public selectionControl = new UntypedFormControl();
  //#endregion FORM

  private filterInitSubject = new Subject();

  constructor() {
    this.filterInitSubject.subscribe((value) => {
      this.selectionControl.setValue(value, { emitEvent: false });
    });

    this.selectionControl.valueChanges.subscribe((selection) => {
      this.selectedOption.emit(selection);
    });
  }
}
