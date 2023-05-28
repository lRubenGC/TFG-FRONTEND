import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicCarsService } from '../../basic-cars-page/basic-cars.service';
import { PremiumCarsService } from '../../premium-cars-page/premium-cars.service';
import { UserService } from '../../../services/user.service';
import { userInterface } from 'src/app/models/user.interface';
import { basicCarInterface, basicCarShowedInterface, premiumCarInterface, premiumCarShowedInterface } from 'src/app/models/cardTypes.interface';
import { decodeToken } from 'src/app/helpers/generics';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

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

  selectedYear = 'all';
  selectedSerie = '';
  selectedMainSerie = 'all';
  selectedSecondarySerie = '';
  availableYears = ['2022', '2021', '2020', '2019', '2018'];
  availableSeries = [];
  availableMainSeries = ['Boulevard (original)', 'Boulevard (reboot)', 'Car Culture', 'Fast & Furious (Premium)', 'Fast & Furious', 'Pop Culture'];
  availableSecondarySeries = [];


  error = false;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private basicCarsService: BasicCarsService,
    private premiumCarsService: PremiumCarsService,
    private userService: UserService,
  ) { }

 ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const username = params.get('username');
      if (username) {
        const user = await this.userService.getUserByUsername(username);
        this.user = user.user;
      } else {
        this.error = true;
        this.router.navigate(['/']);
      }

      const tokenDecoded = decodeToken();

      // If user visitor is owner of profile
      if (tokenDecoded.userId === this.user?.id) {
        this.userVisitor = true;
        this.getUserBasicCars(true);
        this.getUserPremiumCars(true);
      } else {
        this.userVisitor = false;
        this.getUserBasicCars(false);
        this.getUserPremiumCars(false);
      }

    });
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
        }
        break;
      
      case 'basic wished':
        index = this.basicCarsWished.findIndex(car => car.id === carEvent.id);
        if (index !== -1) {
          this.basicCarsWished.splice(index, 1);
        }
        break;

      case 'premium owned':
        index = this.premiumCarsOwned.findIndex(car => car.id === carEvent.id);
        if (index !== -1) {
          this.premiumCarsOwned.splice(index, 1);
        }
        break;

      case 'premium wished':
        index = this.premiumCarsWished.findIndex(car => car.id === carEvent.id);
        if (index !== -1) {
          this.premiumCarsWished.splice(index, 1);
        }
        break;
    }
    
  }

  filterYear(year: string) {
    this.selectedYear = year;
    this.selectedSerie = 'all';
    this.getAvailableSeries(year);

    if (year === 'all') {
      this.basicCarsOwnedShowed = this.basicCarsOwned;
      this.basicCarsWishedShowed = this.basicCarsWished;
      this.selectedSerie = '';
      return;
    }

    this.basicCarsOwnedShowed = this.basicCarsOwned.filter(car => car.year === year);
    this.basicCarsWishedShowed = this.basicCarsWished.filter(car => car.year === year);
  }

  filterSerie(serie: string) {
    if (serie === 'all') {
      this.basicCarsOwnedShowed = this.basicCarsOwned.filter(car => car.year === this.selectedYear);
      this.basicCarsWishedShowed = this.basicCarsWished.filter(car => car.year === this.selectedYear);
      return;
    }

    this.basicCarsOwnedShowed = this.basicCarsOwned.filter(car => {
      return car.year === this.selectedYear && car.series[0] === serie
    });

    this.basicCarsWishedShowed = this.basicCarsWished.filter(car => {
      return car.year === this.selectedYear && car.series[0] === serie
    });
  }

  getAvailableSeries(year: string) {
    this.basicCarsService.getAvailableSeries(year).subscribe(res => {
      const series = res.series.split(',');
      this.availableSeries = series.sort();
    })
  }

  filterPremiumSerie(serie: string) {
    this.selectedMainSerie = serie;
    this.selectedSecondarySerie = '';
    this.getAvailablePremiumSeries(serie);

    if (serie === 'all') {
      this.premiumCarsOwnedShowed = this.premiumCarsOwned;
      this.premiumCarsWishedShowed = this.premiumCarsWished;
      this.selectedSecondarySerie = '';
      return;
    }

    this.premiumCarsOwnedShowed = this.premiumCarsOwned.filter(car => car.main_serie === serie);
    this.premiumCarsWishedShowed = this.premiumCarsWished.filter(car => car.main_serie === serie);
  }

  filterPremiumSecundarySerie(serie: string) {
    if (serie === 'all') {
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

  goToConfig() {
    this.router.navigate(['/user/config']);
  }

}
