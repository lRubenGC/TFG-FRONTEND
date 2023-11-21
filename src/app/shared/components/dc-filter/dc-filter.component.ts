import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'dc-filter',
  standalone: true,
  templateUrl: './dc-filter.component.html',
  styleUrls: ['./dc-filter.component.css'],
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
})
export class DcFilterComponent {
  //#region INPUTS
  @Input() header: string = '';
  @Input() set options(val: string[]) {
    this.optionsSubject.next(val);
  }
  @Input() set filterInit(val: string) {
    this.filterInitSubject.next(val);
  }
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() selectedOption = new EventEmitter<string>();
  //#endregion OUTPUTS

  //#region OPTIONS
  private optionsSubject = new BehaviorSubject<string[]>([]);
  public options$ = this.optionsSubject.asObservable();
  //#endregion OPTIONS

  //#region FILTER INIT
  private filterInitSubject = new BehaviorSubject<string>('');
  //#endregion FILTER INIT

  //#region FORM
  public selectionControl = new UntypedFormControl();
  //#endregion FORM

  constructor() {
    this.filterInitSubject.subscribe((val) => {
      this.selectionControl.setValue(val, { emitEvent: false });
    })

    this.selectionControl.valueChanges.subscribe((selection) => {
      this.selectedOption.emit(selection);
    });
  }
}
