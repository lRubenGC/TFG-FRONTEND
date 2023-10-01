import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SearchResultsService } from './search-results.service';
import { Subscription } from 'rxjs';
import { BasicCarsService } from '../basic-cars-page/basic-cars.service';
import { PremiumCarsService } from '../premium-cars-page/premium-cars.service';
import { decodeToken, tokenObject } from 'src/app/helpers/generics';
import { basicCarInterface, premiumCarInterface } from 'src/app/models/cardTypes.interface';
import { LoaderService } from '../../services/loader.service';
import { UserCars } from '../../models/userCars.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.css']
})
export class SearchResultsPageComponent implements OnInit, OnDestroy {

  userToken!: tokenObject;

  // Subscription for refresh the search bar data
  private routeParamsSubscription!: Subscription;

  query = '';
  searchType = 'cars';

  basicCars: basicCarInterface[] = [];
  premiumCars: premiumCarInterface[] = [];

  users = [];

  error = false;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private basicCarsService: BasicCarsService,
    private loaderService: LoaderService,
    private premiumCarsService: PremiumCarsService,
    private searchResultsService: SearchResultsService,
  ) { }

  async ngOnInit() {
    this.userToken = await decodeToken();

    // Gets the query and runs searchCars()
    this.routeParamsSubscription = this.route.params.subscribe((params: Params) => {
      this.query = params['query'];
      this.searchCars(params['query']);
      this.searchUsers(params['query']);
    });
  }

  ngOnDestroy(): void {
    // Subscription for refresh the search bar data
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
    }
  }
  
  searchUsers(query: string) {
    if (!query) return;

    this.searchResultsService.getUsers(query).subscribe(res => {
      this.users = res.users;
    });
  }

  searchCars(query: string) {
    if (!query) return;

    this.searchResultsService.getCars(query).subscribe(res => {
      const basicCars = this.processBasicCars(res.basicCars);
      const premiumCars = this.processPremiumCars(res.premiumCars);

      if (this.userToken.hasToken && this.userToken.userId) {
        Promise.all([
          this.processUserBasicCars(basicCars),
          this.processUserPremiumCars(premiumCars)
        ]).then(([finalBasicCars, finalPremiumCars]) => {
          this.basicCars = finalBasicCars;
          this.premiumCars = finalPremiumCars;
        }).catch(error => {
          console.error(error);
        }).finally(() => {
          this.loaderService.stopLoading();
        });
      } else {
        this.basicCars = basicCars;
        this.premiumCars = premiumCars;
        this.loaderService.stopLoading();
      }
    });
  }

  processBasicCars(cars: any) {
    return cars.map((car: basicCarInterface) => {
      const series = car.series.split(',');
      const serie_class = series[0].replace(/ /g, '-').toLowerCase();

      return {
        ...car,
        series,
        serie_class,
        search: true,
        user_profile: true,
      };
    }).sort((a: any, b: any) => a.year - b.year);
  }

  processPremiumCars(cars: any) {
    return cars.map((car: premiumCarInterface) => ({
      ...car,
      search: true,
      user_profile: true,
    }));
  }

  async processUserBasicCars(basicCars: any) {
    try {
      const userCars = await this.getUserBasicCars();
      userCars.carsOwned.forEach((carOwned: any) => {
        const matchedCar = basicCars.find((car: any) => car.id === carOwned.id);
        if (matchedCar) matchedCar.has_car = true;
      });

      userCars.carsWished.forEach((carWished: any) => {
        const matchedCar = basicCars.find((car: any) => car.id === carWished.id);
        if (matchedCar) matchedCar.wants_car = true;
      });

      return basicCars.map((car: any) => ({
        ...car,
        token: this.userToken.userId
      }));
    } catch (error) {
      console.error(error);
    }
  }

  async processUserPremiumCars(premiumCars: any) {
    try {
      const userCars = await this.getUserPremiumCars();
      userCars.carsOwned.forEach((carOwned: any) => {
        const matchedCar = premiumCars.find((car: any) => car.id === carOwned.id);
        if (matchedCar) matchedCar.has_car = true;
      });

      userCars.carsWished.forEach((carWished: any) => {
        const matchedCar = premiumCars.find((car: any) => car.id === carWished.id);
        if (matchedCar) matchedCar.wants_car = true;
      });

      return premiumCars.map((car: any) => ({
        ...car,
        token: this.userToken.userId
      }));
    } catch (error) {
      console.error(error);
    }
  }


  getUserBasicCars(): Promise<UserCars> {
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

  getUserPremiumCars(): Promise<UserCars> {
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

  changeSearchType(type: string) {
    this.searchType = type;
  }

  enableErrorMsg(msg: string | any) {
    this.error = true;
    if (typeof msg === 'string') {
      this.errorMsg = msg;
    } else {
      this.errorMsg = 'GN_UNEXPECTED_ERROR';
    }
  }

}
