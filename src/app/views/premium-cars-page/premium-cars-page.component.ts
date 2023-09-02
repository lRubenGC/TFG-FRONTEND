import { Component, OnInit } from '@angular/core';
import { msgCardInterface } from 'src/app/models/shared.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

import { decodeToken, tokenObject } from 'src/app/helpers/generics';
import { premiumPillInterface } from 'src/app/models/premium.interface';
import { PremiumCarsService } from './premium-cars.service';
import { premiumCarInterface } from 'src/app/models/cardTypes.interface';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-premium-cars-page',
  templateUrl: './premium-cars-page.component.html',
  styleUrls: ['./premium-cars-page.component.css', '../../styles/cars-list.css']
})
export class PremiumCarsPageComponent implements OnInit {

  userToken!: tokenObject;

  cars: any[] = []; // All cars of the main serie selected
  showedCars: any[] = []; // Cars to display

  userCars: any[] = []; // All the cars that user owns
  userCarsShowed: any[] = []; // Cars that user owns to show (for the number)

  isSerieSelected: boolean = false; // When main serie is selected

  selectedMainSerie: string = '';
  selectedSecondarySerie: string = 'All';
  selectedOwned: string = 'FILTER_ALL';

  availableSecondarySeries = [];
  ownedCarsFilter = ['FILTER_ALL', 'FILTER_CARS_OWNED', 'FILTER_CARS_NOT_OWNED'];

  premiumPills: premiumPillInterface[] = [
    {
      label: 'Boulevard (original)',
      img: '../../../assets/images/premium_cars_page/boulevard_original_pill.webp',
      request: 'Boulevard (original)'
    },
    {
      label: 'Boulevard (reboot)',
      img: '../../../assets/images/premium_cars_page/boulevard_reboot_pill.webp',
      request: 'Boulevard (reboot)'
    },
    {
      label: 'Car Culture',
      img: '../../../assets/images/premium_cars_page/car_culture_pill.webp',
      request: 'Car Culture'
    },
    {
      label: 'Fast & Furious (Premium)',
      img: '../../../assets/images/premium_cars_page/fast_and_furious_premium.webp',
      request: 'Fast %26 Furious - Premium'
    },
    {
      label: 'Fast & Furious',
      img: '../../../assets/images/premium_cars_page/fast_and_furious.webp',
      request: 'Fast %26 Furious'
    },
    {
      label: 'Pop Culture',
      img: '../../../assets/images/premium_cars_page/pop_culture_pill.webp',
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
    private loaderService: LoaderService,
    private premiumCarsService: PremiumCarsService,
  ) {}

  async ngOnInit() {
    this.userToken = await decodeToken();

    this.subscription = this.languageService.languageChanged$.subscribe(lang => {
      this.translate.use(lang);
      this.changeLanguage();
    })

    await this.changeLanguage();
    this.loaderService.stopLoading();
  }


  async getCars(main_serie: string) {
    this.setMainSerieTitle(main_serie);
    this.resetSeries();
    this.loaderService.startLoading();

    try {
        const res = await lastValueFrom(this.premiumCarsService.getCars(main_serie));

        this.isSerieSelected = true;
        let cars = res.cars.map((car: premiumCarInterface) => ({ ...car, user_profile: true }));

        if (this.userToken.hasToken && this.userToken.userId) {
            const userCars = await this.getUserCars();
            this.userCars = userCars.carsOwned.filter((carOwned: any) => carOwned.main_serie === main_serie);
            this.userCarsShowed = userCars.carsOwned.filter((carOwned: any) => carOwned.main_serie === main_serie);

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
            });

            this.cars = finalCars;
            this.showedCars = finalCars;
        } else {
            this.cars = cars;
            this.showedCars = cars;
        }
    } catch (error) {
        console.error(error);
        this.enableErrorMsg(error);
    } finally {
        this.loaderService.stopLoading();
    }

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
    this.selectedSecondarySerie = serie;

    let filteredCars = this.cars;
    let filteredUserCars = this.userCars;

    if (serie !== 'All') {
      filteredCars = this.cars.filter(car => car.secondary_serie.includes(serie));
      filteredUserCars = this.userCars.filter(car => car.secondary_serie.includes(serie));
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
      if (this.selectedSecondarySerie === 'All') return true;
      return car.secondary_serie.includes(this.selectedSecondarySerie);
    };
  
    const combinedFilter = (car: any) => filterBasedOnOwnership(car) && filterBasedOnSerie(car);
  
    this.userCarsShowed = serie === 'FILTER_CARS_NOT_OWNED' 
      ? []
      : this.userCars.filter(filterBasedOnSerie);
    this.showedCars = this.cars.filter(combinedFilter);
  }
  
  resetSeries() {
    this.selectedSecondarySerie = 'All';
    this.selectedOwned = 'FILTER_ALL';
  }

  async getUserCars() {
    if (this.userToken.hasToken && this.userToken.userId) {
      try {
        const res = await lastValueFrom(this.premiumCarsService.getUserCars(this.userToken.userId));
        return res;
      } catch (error) {
        throw error;
      }
    }
    return Promise.resolve({});
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
    try {
      this.msg_card.title = await lastValueFrom(this.translate.get('PREMIUM_CARS_TITLE'));
      this.msg_card.description[0] = await lastValueFrom(this.translate.get('PREMIUM_CARS_DESCRIPTION_1'));
      this.msg_card.description[1] = await lastValueFrom(this.translate.get('PREMIUM_CARS_DESCRIPTION_2'));
      this.msg_card.description[2] = await lastValueFrom(this.translate.get('PREMIUM_CARS_DESCRIPTION_3'));
      this.msg_card.description[3] = await lastValueFrom(this.translate.get('PREMIUM_CARS_DESCRIPTION_4'));
    } catch (error) {
      console.error('Error changing language:', error);
    }
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
