import { Component, OnInit } from '@angular/core';
import { msgCardInterface } from 'src/app/models/shared.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

import { decodeToken } from 'src/app/helpers/generics';
import { premiumPillInterface } from 'src/app/models/premium.interface';
import { PremiumCarsService } from './premium-cars.service';
import { premiumCarInterface } from 'src/app/models/cardTypes.interface';

@Component({
  selector: 'app-premium-cars-page',
  templateUrl: './premium-cars-page.component.html',
  styleUrls: ['./premium-cars-page.component.css']
})
export class PremiumCarsPageComponent implements OnInit {

  userToken = decodeToken();

  cars: any[] = [];
  showedCars: any[] = [];

  isSerieSelected: boolean = false;

  selectedMainSerie: string = '';
  selectedSecondarySerie: string = 'All';
  selectedYear: string = '';

  availableSecondarySeries = [];
  availableYears = [];

  premiumPills: premiumPillInterface[] = [
    {
      label: 'Boulevard (original)',
      img: '../../../assets/images/premium_cars_page/boulevard_original_pill.png',
      request: 'Boulevard (original)'
    },
    {
      label: 'Boulevard (reboot)',
      img: '../../../assets/images/premium_cars_page/boulevard_reboot_pill.png',
      request: 'Boulevard (reboot)'
    },
    {
      label: 'Car Culture',
      img: '../../../assets/images/premium_cars_page/car_culture_pill.png',
      request: 'Car Culture'
    },
    {
      label: 'Fast & Furious (Premium)',
      img: '../../../assets/images/premium_cars_page/fast_and_furious_premium.png',
      request: 'Fast %26 Furious - Premium'
    },
    {
      label: 'Fast & Furious',
      img: '../../../assets/images/premium_cars_page/fast_and_furious.png',
      request: 'Fast %26 Furious'
    },
    {
      label: 'Pop Culture',
      img: '../../../assets/images/premium_cars_page/pop_culture_pill.png',
      request: 'Pop Culture'
    },
  ]

  error = false;
  errorMsg = '';

  msg_card: msgCardInterface = {
    title: '',
    description: [],
    button: false,
  }

  private subscription!: Subscription;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private premiumCarsService: PremiumCarsService,
  ) {}

  ngOnInit() {
    this.subscription = this.languageService.languageChanged$.subscribe(lang => {
      this.translate.use(lang);
      this.changeLanguage();
    })
    
    this.changeLanguage();
  }

  getCars(main_serie: string) {
    this.setMainSerieTitle(main_serie);

    this.premiumCarsService.getCars(main_serie).subscribe(res => {
      this.isSerieSelected = true;
      const cars = res.cars;
      
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

    this.getAvailableSeries(main_serie);
  }

  getAvailableSeries(main_serie: string) {
    this.premiumCarsService.getAvailableSeries(main_serie).subscribe(res => {
      const series = res.series.split(',');
      this.availableSecondarySeries = series.sort();
    })
  }

  setMainSerieTitle(main_serie: string) {
    switch (main_serie) {
      case 'Fast %26 Furious':
        this.selectedMainSerie = 'Fast & Furious';
        break;

      case 'Fast %26 Furious - Premium':
        this.selectedMainSerie = 'Fast & Furious - Premium';
        break;

      default:
        this.selectedMainSerie = main_serie;
    }
  }

  filterSerie(serie: string) {
    switch (serie) {
      case 'All':
        this.showedCars = this.cars;
        break;

      default:
        this.showedCars = this.cars.filter((car: premiumCarInterface) => car.secondary_serie === serie);
        break;
    }
  }

  getUserCars() {
    return new Promise((resolve, reject) => {
      if (this.userToken.hasToken && this.userToken.userId) {
        this.premiumCarsService.getUserCars(this.userToken.userId).subscribe(res => {
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

  disableSerieSelected() {
    this.isSerieSelected = false;
  }
  

  async changeLanguage() {
    const cardTitle = this.translate.get('PREMIUM_CARS_TITLE');
    this.msg_card.title = await lastValueFrom(cardTitle);

    const cardDescr1 = this.translate.get('PREMIUM_CARS_DESCRIPTION_1');
    this.msg_card.description[0] = await lastValueFrom(cardDescr1);

    const cardDesc2 = this.translate.get('PREMIUM_CARS_DESCRIPTION_2');
    this.msg_card.description[1] = await lastValueFrom(cardDesc2);

    const cardDesc3 = this.translate.get('PREMIUM_CARS_DESCRIPTION_3');
    this.msg_card.description[2] = await lastValueFrom(cardDesc3);

    const cardDesc4 = this.translate.get('PREMIUM_CARS_DESCRIPTION_4');
    this.msg_card.description[3] = await lastValueFrom(cardDesc4);
  }

}
