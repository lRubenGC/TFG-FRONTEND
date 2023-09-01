import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicCarsService } from '../../basic-cars-page/basic-cars.service';
import { PremiumCarsService } from '../../premium-cars-page/premium-cars.service';
import { UserService } from '../../../services/user.service';
import { userInterface } from 'src/app/models/user.interface';
import { basicCarInterface, basicCarShowedInterface, customCarInterface, premiumCarInterface, premiumCarShowedInterface } from 'src/app/models/cardTypes.interface';
import { decodeToken } from 'src/app/helpers/generics';
import { CustomCarsService } from '../../custom-cars/custom-cars.service';
import { LoaderService } from 'src/app/services/loader.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css', '../../../styles/cars-list.css']
})
export class UserProfileComponent implements OnInit {

  @Output() errorEvent = new EventEmitter<string>();

  user?: userInterface;
  userVisitor = false;

  carsType = 'basic';
  collectedType = 'owned';

  basicCarsOwned: basicCarShowedInterface[] = [];
  basicCarsOwnedShowed: basicCarShowedInterface[] = [];
  basicCarsWished: basicCarShowedInterface[] = [];
  basicCarsWishedShowed: basicCarShowedInterface[] = [];
  premiumCarsOwned: premiumCarShowedInterface[] = [];
  premiumCarsOwnedShowed: premiumCarShowedInterface[] = [];
  premiumCarsWished: premiumCarShowedInterface[] = [];
  premiumCarsWishedShowed: premiumCarShowedInterface[] = [];
  
  customCarsOwned = [];

  selectedYear = 'All';
  selectedSerie = '';
  selectedMainSerie = 'All';
  selectedSecondarySerie = '';
  availableYears = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];
  availableSeries = [];
  availableMainSeries = ['Boulevard (original)', 'Boulevard (reboot)', 'Car Culture', 'Fast & Furious (Premium)', 'Fast & Furious', 'Pop Culture'];
  availableSecondarySeries = [];


  error = false;
  errorMsg = '';
  exportToCsvError = false;

  constructor(
    private basicCarsService: BasicCarsService,
    private customCarsService: CustomCarsService,
    private loaderService: LoaderService,
    private premiumCarsService: PremiumCarsService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) { }

 ngOnInit() {
  this.loaderService.startLoading();
  
  this.route.paramMap.subscribe(async params => {
    const username = params.get('username');

    if (username) {
      try {
        const userResponse = await this.userService.getUserByUsername(username);
        this.user = userResponse.user;
  
        const tokenDecoded = await decodeToken();
        const isUserOwner = tokenDecoded.userId === this.user?.id;
        this.userVisitor = isUserOwner;
  
        if (this.user) {
          this.getCustomCars(this.user.id);
  
          try {
            const [basicCarsResponse, premiumCarsResponse] = await Promise.all([
              this.basicCarsObservable().toPromise(),
              this.premiumCarsObservable().toPromise()
            ]);
            
            this.processBasicCars(basicCarsResponse, isUserOwner);
            this.processPremiumCars(premiumCarsResponse, isUserOwner);
          } catch (err) {
            console.error(err);
          }
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        this.error = true;
        this.router.navigate(['/']);
      } finally {
        this.loaderService.stopLoading();
      }
    } else {
      this.error = true;
      this.router.navigate(['/']);
      this.loaderService.stopLoading();
    }
  });
  
 }

 processBasicCars(res: any, isUserOwner: boolean) {
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
      token: isUserOwner ? this.user!.id : undefined
    };
  };

  this.basicCarsOwned = res.carsOwned.map(transformCar);
  this.basicCarsOwnedShowed = [...this.basicCarsOwned];
  this.basicCarsWished = res.carsWished.map(transformCar);
  this.basicCarsWishedShowed = [...this.basicCarsWished];
}

processPremiumCars(res: any, isUserOwner: boolean) {
  const transformCar = (car: premiumCarInterface) => {
    return {
      ...car,
      user_profile: isUserOwner,
      profile_view: true,
      has_car: isUserOwner,
      token: isUserOwner ? this.user!.id : undefined
    };
  };

  this.premiumCarsOwned = res.carsOwned.map(transformCar);
  this.premiumCarsOwnedShowed = [...this.premiumCarsOwned];
  this.premiumCarsWished = res.carsWished.map(transformCar);
  this.premiumCarsWishedShowed = [...this.premiumCarsWished];
}


  basicCarsObservable() {
    return this.basicCarsService.getUserCars(this.user!.id);
  }
  
  premiumCarsObservable() {
    return this.premiumCarsService.getUserCars(this.user!.id);
  }
  
  getUserBasicCars(isUserOwner: boolean) {
    if (this.user) {
      this.basicCarsService.getUserCars(this.user.id).subscribe(res => {

        const basicCarsOwned = res.carsOwned.map((car: basicCarInterface) => {
          const series = car.series.split(',');
          const serie_class = series[0].replace(/ /g, '-').toLowerCase();
  
          // If profile is of the user visitor
          if (isUserOwner) {
            return {
              ...car,
              series,
              serie_class,
              search: true,
              user_profile: true,
              profile_view: true,
              has_car: true,
              token: this.user!.id
            }
          } else {
            return {
              ...car,
              series,
              serie_class,
              search: true,
              user_profile: false,
              profile_view: true,
            }
          }
        });

        const basicCarsWished = res.carsWished.map((car: basicCarInterface) => {
          const series = car.series.split(',');
          const serie_class = series[0].replace(/ /g, '-').toLowerCase();
  
          // If profile is of the user visitor
          if (isUserOwner) {
            return {
              ...car,
              series,
              serie_class,
              search: true,
              user_profile: true,
              profile_view: true,
              has_car: true,
              token: this.user!.id
            }
          } else {
            return {
              ...car,
              series,
              serie_class,
              search: true,
              user_profile: false,
              profile_view: true,
            }
          }
        });

        this.basicCarsOwned = basicCarsOwned;
        this.basicCarsOwnedShowed = basicCarsOwned;
        this.basicCarsWished = basicCarsWished;
        this.basicCarsWishedShowed = basicCarsWished;
      })
    }
  }

  getUserPremiumCars(isUserOwner: boolean) {
    if (this.user) {
      this.premiumCarsService.getUserCars(this.user.id).subscribe(res => {

        const premiumCarsOwned = res.carsOwned.map((car: premiumCarInterface) => {

          // If profile is of the user visitor
          if (isUserOwner) {
            return {
              ...car,
              user_profile: true,
              profile_view: true,
              has_car: true,
              token: this.user!.id
            }
          } else {
            return {
              ...car,
              user_profile: false,
              profile_view: true,
            }
          }
        });

        const premiumCarsWished = res.carsWished.map((car: premiumCarInterface) => {

          // If profile is of the user visitor
          if (isUserOwner) {
            return {
              ...car,
              user_profile: true,
              profile_view: true,
              has_car: true,
              token: this.user!.id
            }
          } else {
            return {
              ...car,
              user_profile: false,
              profile_view: true,
            }
          }
        });


        this.premiumCarsOwned = premiumCarsOwned;
        this.premiumCarsOwnedShowed = premiumCarsOwned;
        this.premiumCarsWished = premiumCarsWished;
        this.premiumCarsWishedShowed = premiumCarsWished;
      })
    }
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
    this.carsType = type;

    if(type === 'custom') {
      this.collectedType = 'owned'
    }
  }

  changeCarCollected(type: string) {
    this.collectedType = type;
  }

  onDeleteCar(event: any, typeCar: string) {
    const carEvent = {
      id: event.id,
    }
    let index;
    
    switch (typeCar) {
      case 'basic owned':
        index = this.basicCarsOwned.findIndex(car => car.id === carEvent.id);
        if (index !== -1) {
          this.basicCarsOwned.splice(index, 1);
          this.basicCarsOwnedShowed.splice(index, 1);
        }
        break;
      
      case 'basic wished':
        index = this.basicCarsWished.findIndex(car => car.id === carEvent.id);
        if (index !== -1) {
          this.basicCarsWished.splice(index, 1);
          this.basicCarsWishedShowed.splice(index, 1);
        }
        break;

      case 'premium owned':
        index = this.premiumCarsOwned.findIndex(car => car.id === carEvent.id);
        if (index !== -1) {
          this.premiumCarsOwned.splice(index, 1);
          this.premiumCarsOwnedShowed.splice(index, 1);
        }
        break;

      case 'premium wished':
        index = this.premiumCarsWished.findIndex(car => car.id === carEvent.id);
        if (index !== -1) {
          this.premiumCarsWished.splice(index, 1);
          this.premiumCarsWishedShowed.splice(index, 1);
        }
        break;
    }
    
  }

  filterYear(year: string) {
    this.selectedYear = year;
    this.selectedSerie = 'All';
    this.getAvailableSeries(year);

    if (year === 'All') {
      this.basicCarsOwnedShowed = this.basicCarsOwned;
      this.basicCarsWishedShowed = this.basicCarsWished;
      this.selectedSerie = '';
      return;
    }

    this.basicCarsOwnedShowed = this.basicCarsOwned.filter(car => car.year === year);
    this.basicCarsWishedShowed = this.basicCarsWished.filter(car => car.year === year);
  }

  filterSerie(serie: string) {    
    switch (serie) {
      case 'All':
        this.basicCarsOwnedShowed = this.basicCarsOwned.filter(car => car.year === this.selectedYear);
        this.basicCarsWishedShowed = this.basicCarsWished.filter(car => car.year === this.selectedYear);
        break;

      default:
        this.basicCarsOwnedShowed = this.basicCarsOwned.filter(car => car.series.includes(serie) && car.year === this.selectedYear);
        this.basicCarsWishedShowed = this.basicCarsWished.filter(car => car.series.includes(serie) && car.year === this.selectedYear);
        break;
      }
  }

  getAvailableSeries(year: string) {
    this.basicCarsService.getAvailableSeries(year).subscribe(res => {
      const series = res.series.split(',');
      this.availableSeries = series.sort();
    })
  }

  filterPremiumSerie(serie: string) {
    this.selectedMainSerie = serie;
    this.selectedSecondarySerie = 'All';
    this.getAvailablePremiumSeries(serie);

    if (serie === 'All') {
      this.premiumCarsOwnedShowed = this.premiumCarsOwned;
      this.premiumCarsWishedShowed = this.premiumCarsWished;
      this.selectedSecondarySerie = '';
      return;
    }

    this.premiumCarsOwnedShowed = this.premiumCarsOwned.filter(car => car.main_serie === serie);
    this.premiumCarsWishedShowed = this.premiumCarsWished.filter(car => car.main_serie === serie);
  }

  filterPremiumSecundarySerie(serie: string) {
    if (serie === 'All') {
      this.premiumCarsOwnedShowed = this.premiumCarsOwned.filter(car => car.main_serie === this.selectedMainSerie);
      this.premiumCarsWishedShowed = this.premiumCarsWished.filter(car => car.main_serie === this.selectedMainSerie);
      return;
    }

    this.premiumCarsOwnedShowed = this.premiumCarsOwned.filter(car => car.secondary_serie === serie);
    this.premiumCarsWishedShowed = this.premiumCarsWished.filter(car => car.secondary_serie === serie);
  }

  getAvailablePremiumSeries(main_serie: string) {
    this.premiumCarsService.getAvailableSeries(main_serie).subscribe(res => {
      const series = res.series.split(',');
      this.availableSecondarySeries = series.sort();
    })
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
    this.loaderService.startLoading();
    this.router.navigate(['/user/config']);
  }

  exportToCsv() {
    if (this.user) {
      this.userService.downloadUserCollection(this.user.id)
        .catch(err => {
          this.exportToCsvError = true;
        })
    }
  }

}
