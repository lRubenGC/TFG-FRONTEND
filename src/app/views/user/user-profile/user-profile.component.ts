import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicCarsService } from '../../basic-cars-page/basic-cars.service';
import { PremiumCarsService } from '../../premium-cars-page/premium-cars.service';
import { UserService } from '../../../services/user.service';
import { userInterface } from 'src/app/models/user.interface';
import { basicCarInterface, basicCarShowedInterface, premiumCarInterface, premiumCarShowedInterface } from 'src/app/models/cardTypes.interface';
import { carsType, collectedType } from 'src/app/models/user-profile';
import { decodeToken } from 'src/app/helpers/generics';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user?: userInterface;

  carsType = 'basic';
  collectedType = 'owned';

  basicCarsOwned: basicCarShowedInterface[] = [];
  basicCarsWished: basicCarShowedInterface[] = [];
  premiumCarsOwned: premiumCarShowedInterface[] = [];
  premiumCarsWished:premiumCarShowedInterface[] = [];
  
  customCarsOwned = [];

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

      if (tokenDecoded.userId === this.user?.id) {
        this.getUserBasicCars(true);
        this.getUserPremiumCars(true);
      } else {
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
              has_car: true,
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
        this.basicCarsWished = basicCarsWished;
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
        this.premiumCarsWished = premiumCarsWished;
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

}
