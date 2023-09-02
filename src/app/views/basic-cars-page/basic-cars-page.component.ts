import { Component, OnInit } from '@angular/core';
import { BasicCarsService } from './basic-cars.service';
import { msgCardInterface } from 'src/app/models/shared.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { basicCarInterface } from 'src/app/models/cardTypes.interface';
import { decodeToken, tokenObject } from 'src/app/helpers/generics';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-basic-cars-page',
  templateUrl: './basic-cars-page.component.html',
  styleUrls: ['./basic-cars-page.component.css', '../../styles/cars-list.css']
})
export class BasicCarsPageComponent implements OnInit {

  userToken!: tokenObject;

  cars: any[] = []; // All cars of the year selected
  showedCars: any[] = []; // Cars to display

  userCars: any[] = []; // All the cars that user owns
  userCarsShowed: any[] = []; // Cars that user owns to show (for the number)

  // Selected filters
  selectedYear: string = '2023';
  selectedSerie: string = 'All';
  selectedOwned: string = 'FILTER_ALL';

  // Filter options
  availableYears = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];
  availableSeries = [];
  ownedCarsFilter = ['FILTER_ALL', 'FILTER_CARS_OWNED', 'FILTER_CARS_NOT_OWNED'];

  // Error handler
  error = false;
  errorMsg = '';

  // Msg Card component
  msg_card: msgCardInterface = {
    title: '',
    description: [],
    button: false,
  }

  private subscription!: Subscription;

  constructor(
    private basicCarsService: BasicCarsService,
    private loaderService: LoaderService,
    private languageService: LanguageService,
    private translate: TranslateService,
  ) {}

  async ngOnInit() {
    this.userToken = await decodeToken();
    this.getCars(this.selectedYear);

    this.subscription = this.languageService.languageChanged$.subscribe(lang => {
      this.translate.use(lang);
      this.changeLanguage();
    })
    
    this.changeLanguage();
  }

  async getCars(year: string) {
    this.loaderService.startLoading();
  
    try {
      const carsResponse = await lastValueFrom(this.basicCarsService.getCarsByYear(year));
      let cars = carsResponse.cars.map((car: basicCarInterface) => {
        const series = car.series.split(',');
        const serie_class = series[0].replace(/ /g, '-').toLowerCase();
        return {
          ...car,
          series,
          serie_class,
          user_profile: true
        };
      });
  
      if (this.userToken.hasToken && this.userToken.userId) {
        const userCarsResponse = await this.getUserCars() as { carsOwned: any[]; carsWished: any[] };

        this.userCars = userCarsResponse.carsOwned.filter((carOwned: any) => carOwned.year === year);
        this.userCarsShowed = userCarsResponse.carsOwned.filter((carOwned: any) => carOwned.year === year);
  
        userCarsResponse.carsOwned.forEach((carOwned: any) => {
          const matchedCar = cars.find((car: any) => car.id === carOwned.id);
          if (matchedCar) {
            matchedCar.has_car = true;
          }
        });
  
        userCarsResponse.carsWished.forEach((carWished: any) => {
          const matchedCar = cars.find((car: any) => car.id === carWished.id);
          if (matchedCar) {
            matchedCar.wants_car = true;
          }
        });
  
        cars = cars.map((car: any) => {
          return {
            ...car,
            token: this.userToken.userId
          };
        });
      }
  
      this.cars = cars;
      this.showedCars = cars;
  
    } catch (error) {
      console.error(error);
      this.enableErrorMsg(error);
    } finally {
      this.loaderService.stopLoading();
      this.getAvailableSeries(year);
      this.resetSeries();
    }
  }
  

  getAvailableSeries(year: string) {
    this.basicCarsService.getAvailableSeries(year).subscribe(res => {
      const series = res.series.split(',');
      this.availableSeries = series.sort();
    })
  }

  filterSerie(serie: string) {
    this.selectedSerie = serie;

    let filteredCars = this.cars;
    let filteredUserCars = this.userCars;

    if (serie !== 'All') {
      filteredCars = this.cars.filter(car => car.series.includes(serie));
      filteredUserCars = this.userCars.filter(car => car.series.includes(serie));
    }

    switch (this.selectedOwned) {
      case 'FILTER_CARS_OWNED':
        this.userCarsShowed = filteredUserCars;
        this.showedCars = filteredCars.filter(car => car.has_car);
        break;

      case 'FILTER_CARS_NOT_OWNED':
        this.userCarsShowed = [];
        this.showedCars = filteredCars.filter(car => !car.has_car);
        break;
  
      default:
        this.userCarsShowed = filteredUserCars;
        this.showedCars = filteredCars;
        break;
    }
  }

  filterSerieOwned(serie: string) {
    this.selectedOwned = serie;
    const filterBasedOnOwnership = (car: any) => {
      switch (serie) {
        case 'FILTER_ALL':
          return true;
        case 'FILTER_CARS_OWNED':
          return car.has_car;
        case 'FILTER_CARS_NOT_OWNED':
          return !car.has_car;
        default:
          return true;
      }
    };
  
    const filterBasedOnSerie = (car: any) => {
      if (this.selectedSerie === 'All') return true;
      return car.series.includes(this.selectedSerie);
    };
  
    const combinedFilter = (car: any) => filterBasedOnOwnership(car) && filterBasedOnSerie(car);
  
    this.userCarsShowed = serie === 'FILTER_CARS_NOT_OWNED' 
      ? [] 
      : this.userCars.filter(filterBasedOnSerie);
    this.showedCars = this.cars.filter(combinedFilter);
  }

  resetSeries() {
    this.selectedSerie = 'All';
    this.selectedOwned = 'FILTER_ALL';
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

    const cardDesc5 = this.translate.get('BASIC_CARS_DESCRIPTION_5');
    this.msg_card.description[3] = await lastValueFrom(cardDesc5);
  }

  onDeleteCar(carDeleted: any) {
    this.userCars = this.userCars.filter(car => car.id !== carDeleted.id);
    this.userCarsShowed = this.userCarsShowed.filter(car => car.id !== carDeleted.id);
  }

  onAddedCar(carAdded: any) {
    const existingCar = this.userCars.find(car => car.id === carAdded.id);

    if (!existingCar) {
      this.userCars.push(carAdded);
      this.userCarsShowed.push(carAdded);
    }
  }

}
