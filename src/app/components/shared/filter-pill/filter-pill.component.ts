import { Component, Input, Output, EventEmitter } from '@angular/core';


export interface IFilterPillProps {
  label: string;
  options: string[];
  selected: string;
  basicDefaultSeries?: boolean;
}

export interface IBasicDefaultSeries {
  value: string;
  text: string;
}


@Component({
  selector: 'app-filter-pill',
  templateUrl: './filter-pill.component.html',
  styleUrls: ['./filter-pill.component.css']
})


export class FilterPillComponent {

  @Input() props!: IFilterPillProps;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  basicDefaultSeries: IBasicDefaultSeries[] = [
    {
      value: 'All',
      text: 'FILTER_ALL'
    },
    {
      value: 'Treasure Hunt',
      text: 'Treasure Hunt'
    },
    {
      value: 'Super Treasure Hunt',
      text: 'Super Treasure Hunt'
    },
    {
      value: 'Red Edition',
      text: 'Red Edition'
    },
    {
      value: 'Walmart Exclusive',
      text: 'Zamac'
    }
  ]

  constructor(
  ) { }

  handleChange() {
    this.onChange.emit(this.props.selected);
  }

}
