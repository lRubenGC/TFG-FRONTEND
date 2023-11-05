import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CarsService } from 'src/app/components/car-cards/services/cars.service';
import { decodeToken, tokenObject } from 'src/app/helpers/generics';
import { customCarInterface } from 'src/app/models/cardTypes.interface';
import { mapAndSortCustomCars } from '../../../helpers/map-cars';
import { CustomCarsService } from '../custom-cars.service';

@Component({
  selector: 'app-custom-cars-page',
  templateUrl: './custom-cars-page.component.html',
  styleUrls: [
    './custom-cars-page.component.css',
    '../../../styles/cars-views.css',
  ],
})
export class CustomCarsPageComponent implements OnInit {
  userToken!: tokenObject;

  cars: customCarInterface[] = [];

  selectedFilter = 'date_recents';

  error = false;
  errorMsg = '';

  constructor(
    private customCarsService: CustomCarsService,
    private carsService: CarsService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.userToken = await decodeToken();
    this.getCustomCars();
  }

  getCustomCars() {
    if (this.userToken.hasToken && this.userToken.userId) {
      forkJoin({
        cars: this.customCarsService.getCustomCars(),
        userVotes: this.carsService.getUserVotes(this.userToken.userId),
      }).subscribe(
        ({ cars, userVotes }) => {
          if (this.userToken.userId) {
            this.cars = mapAndSortCustomCars(
              cars,
              userVotes,
              this.userToken.userId
            );
          }
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      this.customCarsService.getCustomCars().subscribe(
        (res) => {
          this.cars = mapAndSortCustomCars(res);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  uploadCar() {
    this.router.navigate(['/custom-cars/upload']);
  }

  filterCars(ev: any) {
    if (ev === 'upvotes') {
      this.cars.sort((a, b) => b.upvotes - a.upvotes);
    } else if (ev === 'date_recents') {
      this.cars.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (ev === 'date_olders') {
      this.cars.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
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
