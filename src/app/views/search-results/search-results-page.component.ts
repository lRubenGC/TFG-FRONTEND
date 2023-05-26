import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SearchResultsService } from './search-results.service';
import { Subscription } from 'rxjs';
import { BasicCarsService } from '../basic-cars-page/basic-cars.service';
import { PremiumCarsService } from '../premium-cars-page/premium-cars.service';
import { decodeToken } from 'src/app/helpers/generics';
import { basicCarInterface, basicCarShowedInterface, premiumCarInterface } from 'src/app/models/cardTypes.interface';
import { premiumCarShowedInterface } from 'src/app/models/cardTypes.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.css']
})
export class SearchResultsPageComponent implements OnInit, OnDestroy {

  userToken = decodeToken();

  // Subscription for refresh the search bar data
  private routeParamsSubscription!: Subscription;

  query = '';
  searchType = 'cars';

  basicCars: basicCarShowedInterface[] = [];
  premiumCars: premiumCarShowedInterface[] = [];

  users = [];

  error = false;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private basicCarsService: BasicCarsService,
    private premiumCarsService: PremiumCarsService,
    private searchResultsService: SearchResultsService,
  ) { }

  ngOnInit(): void {
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
    if (query) {
      this.searchResultsService.getUsers(query).subscribe(res => {
        this.users = res.users;
      })
    }
  }

  searchCars(query: string) {
    if (query) {
      
      // Gets Basic and Premiums cars
      this.searchResultsService.getCars(query).subscribe(res => {
        const basicCars = res.basicCars.map((car: basicCarInterface) => {
          const series = car.series.split(',');
          const serie_class = series[0].replace(/ /g, '-').toLowerCase();
  
          return {
            ...car,
            series,
            serie_class,
            search: true
          }
        });

        // Order car asc
        basicCars.sort((a: any, b: any) => a.year - b.year);

        const premiumCars = res.premiumCars.map((car: premiumCarInterface) => {
          return {
            ...car,
            search: true
          }
        });

        // If user is logged in
        if (this.userToken.hasToken && this.userToken.userId) {

          // Gets cars that user has in his lists for print them correctly
          this.getUserBasicCars().then((userCars: any) => {
            userCars.carsOwned.forEach((carOwned: any) => {
              const matchedCar = basicCars.find((car: any) => car.id === carOwned.id);
              if (matchedCar) {
                matchedCar.has_car = true;
              }
            });
    
            userCars.carsWished.forEach((carWished: any) => {
              const matchedCar = basicCars.find((car: any) => car.id === carWished.id);
              if (matchedCar) {
                matchedCar.wants_car = true;
              }
            });
  
            const finalCars = basicCars.map((car: any) => {
              return {
                ...car,
                token: this.userToken.userId
              }
            })
    
            this.basicCars = finalCars;
          }).catch(error => {
            console.error(error);
          });

          // Same for Premium cars
          this.getUserPremiumCars().then((userCars: any) => {
            userCars.carsOwned.forEach((carOwned: any) => {
              const matchedCar = premiumCars.find((car: any) => car.id === carOwned.id);
              if (matchedCar) {
                matchedCar.has_car = true;
              }
            });
    
            userCars.carsWished.forEach((carWished: any) => {
              const matchedCar = premiumCars.find((car: any) => car.id === carWished.id);
              if (matchedCar) {
                matchedCar.wants_car = true;
              }
            });
  
            const finalCars = premiumCars.map((car: any) => {
              return {
                ...car,
                token: this.userToken.userId
              }
            })
    
            this.premiumCars = finalCars;
          }).catch(error => {
            console.error(error);
          });

        } else {
          this.basicCars = basicCars;
          this.premiumCars = premiumCars;
        }
      })
    }
  }

  getUserBasicCars() {
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

  getUserPremiumCars() {
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
