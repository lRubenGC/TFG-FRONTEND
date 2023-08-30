import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BasicDefaultSeries, BasicDefaultYears, CustomDefaultOptions, IDefaultSeries, IFilterPillProps, PremiumDefaultSeries } from 'src/app/models/filter-pill';


@Component({
  selector: 'app-filter-pill',
  templateUrl: './filter-pill.component.html',
  styleUrls: ['./filter-pill.component.css']
})


export class FilterPillComponent {

  @Input() props!: IFilterPillProps;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  basicDefaultSeries: IDefaultSeries[] = BasicDefaultSeries;
  premiumDefaultSeries: IDefaultSeries[] = PremiumDefaultSeries;
  customDefaultOptions: IDefaultSeries[] = CustomDefaultOptions;
  basicDefaultYears: IDefaultSeries[] = BasicDefaultYears;

  constructor(
  ) { }

  handleChange() {
    this.onChange.emit(this.props.selected);
  }

}
