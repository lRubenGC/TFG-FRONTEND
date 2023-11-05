import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  createSpecialGroup,
  filterMainSerie,
  filterSeries,
  filterYear,
} from 'src/app/helpers/filter-series';
import { decodeToken } from 'src/app/helpers/generics';
import {
  basicCarInterface,
  basicCarsGrouped,
  basicGlobalGroup,
  customCarInterface,
  premiumCarInterface,
  premiumCarsGrouped,
  premiumGlobalGroup,
} from 'src/app/models/cardTypes.interface';
import { userInterface } from 'src/app/models/user.interface';
import { UserService } from '../../../services/user.service';
import { BasicCarsService } from '../../basic-cars-page/basic-cars.service';
import { CustomCarsService } from '../../custom-cars/custom-cars.service';
import { PremiumCarsService } from '../../premium-cars-page/premium-cars.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css', '../../../styles/cars-views.css'],
})
export class UserProfileComponent implements OnInit {
  @Output() errorEvent = new EventEmitter<string>();

  user?: userInterface;
  userVisitor = false;

  // Tipo de coche seleccionado
  carsTypeSelected = 'basic';
  collectedTypeSelected = 'owned';

  basicCarsOwned: basicGlobalGroup[] = []; // Básicos en propiedad
  basicCarsWished: basicGlobalGroup[] = []; // Básicos deseados
  basicCarsOwnedNumber: number = 0;
  carsGroupedSeries: number = 0; // Número de grupos básicos (Sirve para el grupo especial en la última posicion + 1)

  premiumCarsOwned: premiumGlobalGroup[] = []; // Premium en propiedad
  premiumCarsWished: premiumGlobalGroup[] = []; // Premium deseados
  premiumCarsOwnedNumber: number = 0;

  customCarsOwned = []; // Customs en propiedad

  // Filtro seleccionado y disponibles (Basic cars)
  selectedYear = 'ALL';
  selectedSerie = '';
  availableYears = [
    '2024',
    '2023',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
  ];
  availableSeries = [];

  // Filtro seleccionado y disponibles (Premium cars)
  selectedMainSerie = 'ALL';
  selectedSecondarySerie = '';
  availableMainSeries = [
    'Boulevard (original)',
    'Boulevard (reboot)',
    'Car Culture',
    'Fast & Furious (Premium)',
    'Fast & Furious',
    'Pop Culture',
  ];
  availableSecondarySeries = [];

  // Series especiales (Mover a BE)
  specialSeries = [
    'Treasure Hunt',
    'Super Treasure Hunt',
    'Walmart Exclusive',
    'Kroger Exclusive',
  ];

  // Error handlers
  error = false;
  errorMsg = '';
  exportToCsvError = false;

  constructor(
    private basicCarsService: BasicCarsService,
    private customCarsService: CustomCarsService,
    private premiumCarsService: PremiumCarsService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const username = params.get('username');

      if (username) {
        try {
          const userResponse = await this.userService.getUserByUsername(
            username
          );
          this.user = userResponse.user;

          const tokenDecoded = await decodeToken();
          const isUserOwner = tokenDecoded.userId === this.user?.id;
          this.userVisitor = isUserOwner;

          if (this.user) {
            this.getCustomCars(this.user.id);

            try {
              const [basicCarsResponse, premiumCarsResponse] =
                await Promise.all([
                  this.basicCarsObservable().toPromise(),
                  this.premiumCarsObservable().toPromise(),
                ]);

              this.processBasicCars(basicCarsResponse, isUserOwner);
              this.processPremiumCars(premiumCarsResponse, isUserOwner);
            } catch (err) {
              console.error(err);
            }
          }
        } catch (error) {
          console.error('User not found:', error);
          this.error = true;
          this.router.navigate(['/']);
        } finally {
        }
      } else {
        this.error = true;
        this.router.navigate(['/']);
      }
    });
  }

  processBasicCars(res: any, isUserOwner: boolean) {
    const transformGroup = (group: basicGlobalGroup) => {
      group.series = group.series.map((serie: any) => {
        serie.cars = serie.cars.map(transformCar);

        return {
          ...serie,
          visible: true,
        };
      });

      return {
        ...group,
        visible: true,
      };
    };

    const transformCar = (car: basicCarInterface) => {
      const series = car.series.split(',');
      const serie_class = series[0].replace(/ /g, '-').toLowerCase();

      return {
        ...car,
        series,
        serie_class,
        search: true,
        user_profile: isUserOwner,
        profile_view: true,
        has_car: isUserOwner,
        token: isUserOwner ? this.user!.id : undefined,
        visible: true,
      };
    };

    this.basicCarsOwned = res.groupedOwnedCars.map(transformGroup);
    this.basicCarsWished = res.groupedWishedCars.map(transformGroup);

    // Contar el número de coches básicos que tiene el usuario
    this.basicCarsOwned.forEach((group: basicGlobalGroup) => {
      group.series.forEach((serie: basicCarsGrouped) => {
        serie.cars.forEach(() => this.basicCarsOwnedNumber++);
      });
    });
  }

  processPremiumCars(res: any, isUserOwner: boolean) {
    const transformGroup = (group: premiumGlobalGroup) => {
      group.secondarySeries = group.secondarySeries.map((serie: any) => {
        serie.cars = serie.cars.map(transformCar);

        return {
          ...serie,
          visible: true,
        };
      });

      return {
        ...group,
        visible: true,
      };
    };

    const transformCar = (car: premiumCarInterface) => {
      return {
        ...car,
        user_profile: isUserOwner,
        profile_view: true,
        has_car: isUserOwner,
        token: isUserOwner ? this.user!.id : undefined,
        visible: true,
      };
    };

    this.premiumCarsOwned = res.groupedOwnedCars.map(transformGroup);
    this.premiumCarsWished = res.groupedWishedCars.map(transformGroup);

    // Contar el número de coches premium que tiene el usuario
    this.premiumCarsOwned.forEach((group: premiumGlobalGroup) => {
      group.secondarySeries.forEach((serie: premiumCarsGrouped) => {
        serie.cars.forEach(() => this.premiumCarsOwnedNumber++);
      });
    });
  }

  basicCarsObservable() {
    return this.basicCarsService.getUserCars(this.user!.id);
  }

  premiumCarsObservable() {
    return this.premiumCarsService.getUserCars(this.user!.id);
  }

  enableErrorMsg(msg: string | any) {
    this.error = true;
    if (typeof msg === 'string') {
      this.errorMsg = msg;
    } else {
      this.errorMsg = 'GN_UNEXPECTED_ERROR';
    }
  }

  changeCarType(type: string) {
    this.carsTypeSelected = type;

    if (type === 'custom') {
      this.collectedTypeSelected = 'owned';
    }
  }

  changeCarCollected(type: string) {
    this.collectedTypeSelected = type;
  }

  filterBasicYear(year: string) {
    this.selectedYear = year;
    this.selectedSerie = 'ALL';

    year !== 'ALL' ? this.getAvailableSeries(year) : null;

    if (year === 'ALL') {
      this.basicCarsOwned = filterYear(this.basicCarsOwned);
      this.basicCarsWished = filterYear(this.basicCarsWished);
    } else {
      this.basicCarsOwned = filterYear(this.basicCarsOwned, year);
      this.basicCarsWished = filterYear(this.basicCarsWished, year);
    }
  }

  filterBasicSeries(serie: string) {
    this.selectedSerie = serie;

    if (this.specialSeries.includes(serie)) {
      this.basicCarsOwned.forEach((group) => {
        group.series = createSpecialGroup(
          group.series,
          serie,
          this.carsGroupedSeries
        );
      });

      this.basicCarsWished.forEach((group) => {
        group.series = createSpecialGroup(
          group.series,
          serie,
          this.carsGroupedSeries
        );
      });
    } else {
      this.basicCarsOwned.forEach((group: basicGlobalGroup) => {
        group.series = filterSeries(group.series, serie);
      });

      this.basicCarsWished.forEach((group: basicGlobalGroup) => {
        group.series = filterSeries(group.series, serie);
      });
    }
  }

  getAvailableSeries(year: string) {
    this.basicCarsService.getAvailableSeries(year).subscribe((res) => {
      const series = res.series.split(',');
      this.availableSeries = series.sort();
    });
  }

  filterPremiumSeries(serie: string) {
    this.selectedMainSerie = serie;
    this.selectedSecondarySerie = 'ALL';

    serie !== 'ALL' ? this.getAvailablePremiumSeries(serie) : null;

    if (serie === 'ALL') {
      this.premiumCarsOwned = filterMainSerie(this.premiumCarsOwned);
      this.premiumCarsWished = filterMainSerie(this.premiumCarsWished);
    } else {
      this.premiumCarsOwned = filterMainSerie(this.premiumCarsOwned, serie);
      this.premiumCarsWished = filterMainSerie(this.premiumCarsWished, serie);
    }
  }

  filterPremiumSecundarySeries(serie: string) {
    this.premiumCarsOwned.forEach((group: premiumGlobalGroup) => {
      group.secondarySeries = filterSeries(group.secondarySeries, serie);
    });

    this.premiumCarsWished.forEach((group: premiumGlobalGroup) => {
      group.secondarySeries = filterSeries(group.secondarySeries, serie);
    });
    console.log(this.premiumCarsOwned);
  }

  getAvailablePremiumSeries(main_serie: string) {
    this.premiumCarsService.getAvailableSeries(main_serie).subscribe((res) => {
      const series = res.series.split(',');
      this.availableSecondarySeries = series.sort();
    });
  }

  getCustomCars(userCreator: number) {
    this.customCarsService.getCustomCars(userCreator).subscribe(
      (res) => {
        const customCars = res.cars.map((car: customCarInterface) => {
          return {
            ...car,
            imgs: car.imgs.split(','),
          };
        });

        this.customCarsOwned = customCars;
      },
      (err: string) => {
        console.error(err);
      }
    );
  }

  goToConfig() {
    this.router.navigate(['/user/config']);
  }

  exportToCsv() {
    if (this.user) {
      this.userService.downloadUserCollection(this.user.id).catch((err) => {
        console.error(err);
        this.exportToCsvError = true;
      });
    }
  }
}
