import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, lastValueFrom } from 'rxjs';
import { msgCardInterface } from 'src/app/models/shared.interface';
import { LanguageService } from 'src/app/services/language.service';

import { filterSeries, filterSeriesOwned } from 'src/app/helpers/filter-series';
import { decodeToken, tokenObject } from 'src/app/helpers/generics';
import { matchCars } from 'src/app/helpers/match-cars';
import {
  premiumCarInterface,
  premiumCarsGrouped,
} from 'src/app/models/cardTypes.interface';
import { premiumPillInterface } from 'src/app/models/premium.interface';
import { PremiumCarsService } from './premium-cars.service';

@Component({
  selector: 'app-premium-cars-page',
  templateUrl: './premium-cars-page.component.html',
  styleUrls: [
    './premium-cars-page.component.css',
    '../../styles/cars-views.css',
  ],
})
export class PremiumCarsPageComponent implements OnInit {
  userToken!: tokenObject;

  carsGrouped!: premiumCarsGrouped[]; // Grupos de coches de la API
  carsShowed: number = 0; // Número de coches mostrados | filtrados
  carsOwned: number = 0; // Número de coches en propiedad de los que están mostrados

  isSerieSelected: boolean = false; // Cuando la serie principal es seleccionada (Paso 2)

  // Filtros seleccionados
  selectedMainSerie: string = '';
  selectedSecondarySerie: string = 'ALL';
  selectedOwned: string = 'FILTER_ALL';

  // Opciones de los filtros (Mover a BE)
  availableSecondarySeries = [];
  ownedCarsFilter = [
    'FILTER_ALL',
    'FILTER_CARS_OWNED',
    'FILTER_CARS_NOT_OWNED',
    'FILTER_CARS_WISHED',
  ];

  // Propiedades de las series principales (Mover a BE)
  premiumPills: premiumPillInterface[] = [
    {
      label: 'Boulevard (original)',
      img: '../../../assets/images/premium_cars_page/boulevard_original_pill.webp',
      request: 'Boulevard (original)',
    },
    {
      label: 'Boulevard (reboot)',
      img: '../../../assets/images/premium_cars_page/boulevard_reboot_pill.webp',
      request: 'Boulevard (reboot)',
    },
    {
      label: 'Car Culture',
      img: '../../../assets/images/premium_cars_page/car_culture_pill.webp',
      request: 'Car Culture',
    },
    {
      label: 'Fast & Furious (Premium)',
      img: '../../../assets/images/premium_cars_page/fast_and_furious_premium.webp',
      request: 'Fast %26 Furious - Premium',
    },
    {
      label: 'Fast & Furious',
      img: '../../../assets/images/premium_cars_page/fast_and_furious.webp',
      request: 'Fast %26 Furious',
    },
    {
      label: 'Pop Culture',
      img: '../../../assets/images/premium_cars_page/pop_culture_pill.webp',
      request: 'Pop Culture',
    },
  ];

  error = false;
  errorMsg = '';

  msg_card: msgCardInterface = {
    title: '',
    description: [],
    button: false,
  };

  private subscription!: Subscription;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private premiumCarsService: PremiumCarsService
  ) {}

  async ngOnInit() {
    this.userToken = await decodeToken();

    this.subscription = this.languageService.languageChanged$.subscribe(
      (lang) => {
        this.translate.use(lang);
        this.changeLanguage();
      }
    );

    await this.changeLanguage();
  }

  async getCars(main_serie: string) {
    this.carsShowed = 0;

    try {
      const carsResponse = await lastValueFrom(
        this.premiumCarsService.getCars(main_serie)
      );

      this.isSerieSelected = true;

      const carsTransformed = carsResponse.map((group: premiumCarsGrouped) => {
        const modifiedCars = group.cars.map((car: premiumCarInterface) => {
          this.carsShowed++;

          return {
            ...car,
            user_profile: true,
            visible: true,
          };
        });

        return {
          ...group,
          cars: modifiedCars,
          visible: true,
        };
      });

      this.carsGrouped = carsTransformed;

      // Si existe usuario logueado
      if (this.userToken.hasToken && this.userToken.userId) {
        const userCarsResponse = (await this.getUserCars()) as {
          carsOwned: any[];
          carsWished: any[];
        };

        const matchedCars = matchCars(
          userCarsResponse,
          carsTransformed,
          this.userToken.userId!,
          'PREMIUM_CAR'
        );
        this.carsGrouped = matchedCars.groupedCars;
        this.carsOwned = matchedCars.carsOwned;
      }
    } catch (error) {
      console.error(error);
      this.enableErrorMsg(error);
    } finally {
      this.setMainSerieTitle(main_serie);
      this.getAvailableSeries(main_serie);
      this.resetSeries();
    }
  }

  getAvailableSeries(main_serie: string) {
    this.premiumCarsService.getAvailableSeries(main_serie).subscribe((res) => {
      const series = res.series.split(',');
      this.availableSecondarySeries = series.sort();
    });
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

    this.carsGrouped = filterSeries(this.carsGrouped, serie);

    this.filterSerieOwned();
  }

  // filtrado de coches en propiedad | deseados teniendo en cuenta que serie está filtrada
  filterSerieOwned(serie?: string) {
    if (serie) this.selectedOwned = serie;

    const filterOnwedRes = filterSeriesOwned(
      this.carsGrouped,
      this.selectedOwned,
      this.selectedSecondarySerie
    );

    this.carsGrouped = filterOnwedRes.groupedCars;
    this.carsShowed = filterOnwedRes.carsShowed;
    this.carsOwned = filterOnwedRes.carsOwned;
  }

  resetSeries() {
    this.selectedSecondarySerie = 'ALL';
    this.selectedOwned = 'FILTER_ALL';
  }

  async getUserCars() {
    if (this.userToken.hasToken && this.userToken.userId) {
      try {
        const res = await lastValueFrom(
          this.premiumCarsService.getUserCars(this.userToken.userId)
        );
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
      this.msg_card.title = await lastValueFrom(
        this.translate.get('PREMIUM_CARS_TITLE')
      );
      this.msg_card.description[0] = await lastValueFrom(
        this.translate.get('PREMIUM_CARS_DESCRIPTION_1')
      );
      this.msg_card.description[1] = await lastValueFrom(
        this.translate.get('PREMIUM_CARS_DESCRIPTION_2')
      );
      this.msg_card.description[2] = await lastValueFrom(
        this.translate.get('PREMIUM_CARS_DESCRIPTION_3')
      );
      this.msg_card.description[3] = await lastValueFrom(
        this.translate.get('PREMIUM_CARS_DESCRIPTION_4')
      );
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }

  onDeleteCar(ev: any) {
    if (ev === 'OWNED_DELETED') {
      this.carsOwned--;
    }
  }

  onAddedCar() {
    this.carsOwned++;
  }
}
