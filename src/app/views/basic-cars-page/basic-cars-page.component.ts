import { Component, OnInit } from '@angular/core';
import { BasicCarsService } from './basic-cars.service';
import { msgCardInterface } from 'src/app/models/shared.interface';
import { lastValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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
    title: '',
    description: [],
    button: false,
  }

  constructor(private basicCarsService: BasicCarsService, private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('es');
  }

  async ngOnInit() {
    this.getCars(this.selectedYear);

    const cardTitle = this.translate.get('BASIC_CARS_TITLE');
    this.msg_card.title = await lastValueFrom(cardTitle);

    const cardDescr1 = this.translate.get('BASIC_CARS_DESCRIPTION_1');
    this.msg_card.description[0] = await lastValueFrom(cardDescr1);

    const cardDesc2 = this.translate.get('BASIC_CARS_DESCRIPTION_2');
    this.msg_card.description[1] = await lastValueFrom(cardDesc2);

    const cardDesc3 = this.translate.get('BASIC_CARS_DESCRIPTION_3');
    this.msg_card.description[2] = await lastValueFrom(cardDesc3);
  }

  getCars(year: string) {
    this.basicCarsService.getCarsByYear(year).subscribe(cars => {
      this.cars = cars;
      console.log(cars);
    })
  }

}
