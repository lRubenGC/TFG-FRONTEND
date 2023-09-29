import { Component, OnInit } from '@angular/core';
import { BasicCarsService } from './basic-cars.service';
import { msgCardInterface } from 'src/app/models/shared.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { basicCarInterface, basicCarsGrouped } from 'src/app/models/cardTypes.interface';
import { decodeToken, tokenObject } from 'src/app/helpers/generics';
import { LoaderService } from 'src/app/services/loader.service';
import { matchCars } from 'src/app/helpers/match-cars';
import { filterSeries } from 'src/app/helpers/filter-series';
import { filterSeriesOwned } from '../../helpers/filter-series';

@Component({
  selector: 'app-basic-cars-page',
  templateUrl: './basic-cars-page.component.html',
  styleUrls: ['./basic-cars-page.component.css', '../../styles/cars-views.css']
})
export class BasicCarsPageComponent implements OnInit {

  userToken!: tokenObject;

  carsGrouped!: basicCarsGrouped[]; // Grupos de coches de la API
  carsGroupedSeries: number = 0; // Número de grupos (Sirve para el grupo especial en la última posicion + 1)
  carsShowed: number = 0; // Número de coches mostrados | filtrados
  carsOwned: number = 0; // Número de coches en propiedad de los que están mostrados

  // Filtros seleccionados
  selectedYear: string = '2023';
  selectedSerie: string = 'ALL';
  selectedOwned: string = 'FILTER_ALL';

  // Opciones de los filtros (Mover a BE)
  availableYears = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];
  availableSeries = [];
  ownedCarsFilter = ['FILTER_ALL', 'FILTER_CARS_OWNED', 'FILTER_CARS_NOT_OWNED', 'FILTER_CARS_WISHED'];

  // Series especiales (Mover a BE)
  specialSeries = ['Treasure Hunt', 'Super Treasure Hunt', 'Walmart Exclusive', 'Kroger Exclusive'];

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
    this.selectedYear = year;
    this.carsShowed = 0;

    try {
      const carsResponse = await lastValueFrom(this.basicCarsService.getCarsByYear(year));

      const carsTransformed = carsResponse.map((group: basicCarsGrouped) => {
        const modifiedCars = group.cars.map((car: basicCarInterface) => {
          this.carsShowed++;

          return {
            ...car,
            series: car.series.split(','),
            user_profile: true,
            visible: true
          }
        });

        return {
          ...group,
          cars: modifiedCars,
          visible: true
        };
      });

      this.carsGrouped = carsTransformed;
      this.carsGroupedSeries = carsTransformed.length;

      // Si existe usuario logueado
      if (this.userToken.hasToken && this.userToken.userId) {
        const userCarsResponse = await this.getUserCars() as { carsOwned: any[]; carsWished: any[] };

        const matchedCars = matchCars(userCarsResponse, carsTransformed, this.userToken.userId!);
        this.carsGrouped = matchedCars.groupedCars;
        this.carsOwned = matchedCars.carsOwned;
      }

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
    });
  }

  filterSerie(serie: string) {
    this.selectedSerie = serie;

    if (this.specialSeries.includes(serie)) {
      this.createSpecialGroup(serie);

    } else {
      this.carsGrouped = filterSeries(this.carsGrouped, serie);
    }

    this.filterSerieOwned();
  }

  // filtrado de coches en propiedad | deseados teniendo en cuenta que serie está filtrada
  filterSerieOwned(serie?: string) {
    if (serie) this.selectedOwned = serie;

    const filterOnwedRes = filterSeriesOwned(this.carsGrouped, this.selectedOwned, this.selectedSerie);

    this.carsGrouped = filterOnwedRes.groupedCars;
    this.carsShowed = filterOnwedRes.carsShowed;
    this.carsOwned = filterOnwedRes.carsOwned;
  }

  createSpecialGroup(serieName: string) {
    this.hideAllGroups();

    const especialGroup: basicCarsGrouped = {
      serieName,
      cars: [],
      visible: true
    }

    this.carsGrouped.forEach((group: basicCarsGrouped) => {
      group.cars.forEach((car: basicCarInterface) => {
        if (car.series.includes(serieName)) {
          especialGroup.cars.push({
            ...car,
            visible: true
          });
        }
      })
    });

    this.carsGrouped[this.carsGroupedSeries] = especialGroup;
  }

  hideAllGroups() {
    this.carsGrouped[this.carsGroupedSeries] = {
      serieName: '',
      cars: [],
      visible: false
    };

    this.carsGrouped = this.carsGrouped.map((group: basicCarsGrouped) => {
      group.cars = group.cars.map((car: basicCarInterface) => {
        return {
          ...car,
          visible: false
        }
      });

      return {
        ...group,
        visible: false
      }
    })
  }

  resetSeries() {
    this.selectedSerie = 'ALL';
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
    try {
      this.msg_card.title = await lastValueFrom(this.translate.get('BASIC_CARS_TITLE'));
      this.msg_card.description[0] = await lastValueFrom(this.translate.get('BASIC_CARS_DESCRIPTION_1'));
      this.msg_card.description[1] = await lastValueFrom(this.translate.get('BASIC_CARS_DESCRIPTION_2'));
      this.msg_card.description[2] = await lastValueFrom(this.translate.get('BASIC_CARS_DESCRIPTION_3'));
      this.msg_card.description[3] = await lastValueFrom(this.translate.get('BASIC_CARS_DESCRIPTION_4'));
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