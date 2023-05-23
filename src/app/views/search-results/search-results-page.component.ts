import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SearchResultsService } from './search-results.service';
import { Subscription } from 'rxjs';
import { BasicCarsService } from '../basic-cars-page/basic-cars.service';
import { PremiumCarsService } from '../premium-cars-page/premium-cars.service';
import { decodeToken } from 'src/app/helpers/generics';
import { basicCarInterface, basicCarShowedInterface } from 'src/app/models/cardTypes.interface';
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
  basicCars: basicCarShowedInterface[] = [];
  premiumCars: premiumCarShowedInterface[] = [];

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
    });
  }

  ngOnDestroy(): void {
    // Subscription for refresh the search bar data
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
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
            serie_class
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
              const matchedCar = res.premiumCars.find((car: any) => car.id === carOwned.id);
              if (matchedCar) {
                matchedCar.has_car = true;
              }
            });
    
            userCars.carsWished.forEach((carWished: any) => {
              const matchedCar = res.premiumCars.find((car: any) => car.id === carWished.id);
              if (matchedCar) {
                matchedCar.wants_car = true;
              }
            });
  
            const finalCars = res.premiumCars.map((car: any) => {
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
          this.premiumCars = res.premiumCars;
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

  enableErrorMsg(msg: string | any) {
    this.error = true;
    if (typeof msg === 'string') {
      this.errorMsg = msg;
    } else {
      this.errorMsg = 'GN_UNEXPECTED_ERROR';
    }
  }

}
