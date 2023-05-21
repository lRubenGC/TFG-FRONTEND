import { Component, OnInit } from '@angular/core';
import { BasicCarsService } from './basic-cars.service';
import { msgCardInterface } from 'src/app/models/shared.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { basicCarInterface, basicCarShowedInterface } from 'src/app/models/cardTypes.interface';
import { decodeToken } from 'src/app/helpers/generics';

@Component({
  selector: 'app-basic-cars-page',
  templateUrl: './basic-cars-page.component.html',
  styleUrls: ['./basic-cars-page.component.css']
})
export class BasicCarsPageComponent implements OnInit {

  userToken = decodeToken();

  cars: any[] = [];
  showedCars: any[] = [];

  selectedYear: string = '2022';
  selectedSerie: string = 'All';

  availableYears = ['2022', '2021', '2020', '2019', '2018'];
  availableSeries = [];

  error = false;
  errorMsg = '';

  msg_card: msgCardInterface = {
    title: '',
    description: [],
    button: false,
  }

  private subscription!: Subscription;

  constructor(
    private basicCarsService: BasicCarsService,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.getCars(this.selectedYear);

    this.subscription = this.languageService.languageChanged$.subscribe(lang => {
      this.translate.use(lang);
      this.changeLanguage();
    })
    
    this.changeLanguage();
  }

  getCars(year: string) {
    this.basicCarsService.getCarsByYear(year).subscribe(res => {
      const cars = res.cars.map((car: basicCarInterface) => {
        const series = car.series.split(',');
        const serie_class = series[0].replace(/ /g, '-').toLowerCase();

        return {
          ...car,
          series,
          serie_class
        }
      });

      // If user is logged, gets the cars of the user and changes the values of the cars
      if (this.userToken.hasToken && this.userToken.userId) {
        this.getUserCars().then((userCars: any) => {
          userCars.carsOwned.forEach((carOwned: any) => {
            const matchedCar = cars.find((car: any) => car.id === carOwned.id);
            if (matchedCar) {
              matchedCar.has_car = true;
            }
          });
  
          userCars.carsWished.forEach((carWished: any) => {
            const matchedCar = cars.find((car: any) => car.id === carWished.id);
            if (matchedCar) {
              matchedCar.wants_car = true;
            }
          });

          const finalCars = cars.map((car: any) => {
            return {
              ...car,
              token: this.userToken.userId
            }
          })
  
          this.cars = finalCars;
          this.showedCars = finalCars;
        }).catch(error => {
          console.error(error);
        });
      } else {
        this.cars = cars;
        this.showedCars = cars;
      }

    });

    this.getAvailableSeries(year);
    this.resetSeries();
  }

  getAvailableSeries(year: string) {
    this.basicCarsService.getAvailableSeries(year).subscribe(res => {
      const series = res.series.split(',');
      this.availableSeries = series.sort();
    })
  }

  filterSerie(serie: string) {
    switch (serie) {
      case 'All':
        this.showedCars = this.cars;
        break;

      case 'Treasure Hunt':
      case 'Super Treasure Hunt':
        this.showedCars = this.cars.filter(car => car.series.includes(serie));
        break;

      case 'Walmart Exclusive':
        this.showedCars = this.cars.filter(car => car.series.includes(serie));
        break;

      default:
        this.showedCars = this.cars.filter(car => car.series[0] === serie);
        break;
    }
  }

  resetSeries() {
    this.selectedSerie = 'All';
  }

  getUserCars() {
    return new Promise((resolve, reject) => {
      if (this.userToken.hasToken && this.userToken.userId) {
        this.basicCarsService.getUserCars(this.userToken.userId).subscribe(res => {
          resolve(res);
        }, error => {
          reject(error);
        });
      }
    });
  }

  enableErrorMsg(msg: string | any) {
    this.error = true;
    if (typeof msg === 'string') {
      this.errorMsg = msg;
    } else {
      this.errorMsg = 'GN_UNEXPECTED_ERROR';
    }
  }
  

  async changeLanguage() {
    const cardTitle = this.translate.get('BASIC_CARS_TITLE');
    this.msg_card.title = await lastValueFrom(cardTitle);

    const cardDescr1 = this.translate.get('BASIC_CARS_DESCRIPTION_1');
    this.msg_card.description[0] = await lastValueFrom(cardDescr1);

    const cardDesc2 = this.translate.get('BASIC_CARS_DESCRIPTION_2');
    this.msg_card.description[1] = await lastValueFrom(cardDesc2);

    const cardDesc3 = this.translate.get('BASIC_CARS_DESCRIPTION_3');
    this.msg_card.description[2] = await lastValueFrom(cardDesc3);

    const cardDesc4 = this.translate.get('BASIC_CARS_DESCRIPTION_4');
    this.msg_card.description[3] = await lastValueFrom(cardDesc4);
  }

}
