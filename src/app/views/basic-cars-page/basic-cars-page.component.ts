import { Component, OnInit } from '@angular/core';
import { BasicCarsService } from './basic-cars.service';
import { msgCardInterface } from 'src/app/models/shared.interface';

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

  msg_card: msgCardInterface = {
    // Linea Básica
    title: 'Basic Line',
    // Cada año salen cientos de coches básicos, los cuales pertenecen a diferentes series (Exotics, Retro racers, etc).
    // También hay series especiales, como los Red edition.
    // Y por otra parte existen los tesoros (Treasure hunts y Super treasure hunts) que son muy dificiles de encontrar.
    description: ['Every year hundreds of basic cars come out, which belong to different series (Exotics, Retro racers, etc)', 'There are also special series, such as the Red edition.', 'And on the other hand there are treasures (Treasure hunts and Super treasure hunts) that are very difficult to find.'],
    button: false,
  }

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
