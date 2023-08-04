import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CustomCarsService } from '../custom-cars.service';
import { customCarInterface } from 'src/app/models/cardTypes.interface';
import { decodeToken } from 'src/app/helpers/generics';
import { CarsService } from 'src/app/components/car-cards/services/cars.service';
import { Router } from '@angular/router';
import { mapAndSortCustomCars } from '../../../helpers/map-cars';

@Component({
  selector: 'app-custom-cars-page',
  templateUrl: './custom-cars-page.component.html',
  styleUrls: ['./custom-cars-page.component.css', '../../../styles/cars-list.css']
})
export class CustomCarsPageComponent implements OnInit {

  userToken = decodeToken();

  cars: customCarInterface[] = [];
  
  selectedFilter = 'date_recents';

  error = false;
  errorMsg = '';

  constructor(
    private customCarsService: CustomCarsService,
    private carsService: CarsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCustomCars();
  }


  getCustomCars() {
    if (this.userToken.hasToken && this.userToken.userId) {
        forkJoin({
            cars: this.customCarsService.getCustomCars(),
            userVotes: this.carsService.getUserVotes(this.userToken.userId)
        }).subscribe(({ cars, userVotes }) => {
          if (this.userToken.userId) {
            this.cars = mapAndSortCustomCars(cars, userVotes, this.userToken.userId);
          }
        }, (err) => {
            console.error(err);
        });
    } else {
        this.customCarsService.getCustomCars().subscribe((res) => {
            this.cars = mapAndSortCustomCars(res);
        }, (err) => {
            console.error(err);
        });
    }
  }


  uploadCar() {
    this.router.navigate(['/custom-cars/upload']);
  }  

  filterCars() {
    if (this.selectedFilter === 'upvotes') {
      this.cars.sort((a, b) => b.upvotes - a.upvotes);
    } else if (this.selectedFilter === 'date_recents') {
      this.cars.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (this.selectedFilter === 'date_olders') {
      this.cars.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
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

}
