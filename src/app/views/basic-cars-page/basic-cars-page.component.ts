import { Component, OnInit } from '@angular/core';
import { BasicCarsService } from './basic-cars.service';

@Component({
  selector: 'app-basic-cars-page',
  templateUrl: './basic-cars-page.component.html',
  styleUrls: ['./basic-cars-page.component.css']
})
export class BasicCarsPageComponent implements OnInit {

  cars = [];
  selectedYear: string = '2022';

  availableYears = ['2022', '2021', '2020', '2019', '2018', '2017'];
  availableSeries = [];

  constructor(private basicCarsService: BasicCarsService) { }

  ngOnInit(): void {
    this.getCars(this.selectedYear);
  }

  getCars(year: string) {
    this.basicCarsService.getCarsByYear(year).subscribe(cars => {
      this.cars = cars;
      console.log(cars);
    })
  }

}
