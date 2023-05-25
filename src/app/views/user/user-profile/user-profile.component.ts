import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicCarsService } from '../../basic-cars-page/basic-cars.service';
import { PremiumCarsService } from '../../premium-cars-page/premium-cars.service';
import { UserService } from '../../../services/user.service';
import { userInterface } from 'src/app/models/user.interface';
import { basicCarInterface } from 'src/app/models/cardTypes.interface';
import { carsType, collectedType } from 'src/app/models/user-profile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user?: userInterface;

  carsType = 'basic';
  collectedType = 'owned';

  basicCarsOwned = [];
  basicCarsWished = [];
  premiumCarsOwned = [];
  premiumCarsWished = [];
  
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

  async ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      const user = await this.userService.getUserByUsername(username);
      this.user = user.user;
    } else {
      this.error = true;
      this.router.navigate(['/']);
    }

    this.getUserPremiumCars();
    this.getUserBasicCars();
  }

  getUserBasicCars() {
    if (this.user) {
      this.basicCarsService.getUserCars(this.user.id).subscribe(res => {

        const basicCarsOwned = res.carsOwned.map((car: basicCarInterface) => {
          const series = car.series.split(',');
          const serie_class = series[0].replace(/ /g, '-').toLowerCase();
  
          return {
            ...car,
            series,
            serie_class,
            search: true
          }
        });

        const basicCarsWished = res.carsWished.map((car: basicCarInterface) => {
          const series = car.series.split(',');
          const serie_class = series[0].replace(/ /g, '-').toLowerCase();
  
          return {
            ...car,
            series,
            serie_class,
            search: true
          }
        });

        this.basicCarsOwned = basicCarsOwned;
        this.basicCarsWished = basicCarsWished;
      })
    }
  }

  getUserPremiumCars() {
    if (this.user) {
      this.premiumCarsService.getUserCars(this.user.id).subscribe(res => {
        this.premiumCarsOwned = res.carsOwned;
        this.premiumCarsWished = res.carsWished;
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

}
