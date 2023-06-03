import { Component, OnInit } from '@angular/core';
import { CustomCarsService } from '../custom-cars.service';
import { customCarInterface } from 'src/app/models/cardTypes.interface';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-custom-cars-page',
  templateUrl: './custom-cars-page.component.html',
  styleUrls: ['./custom-cars-page.component.css']
})
export class CustomCarsPageComponent implements OnInit {

  cars: customCarInterface[] = [];
  
  error = false;
  errorMsg = '';

  constructor(
    private customCarsService: CustomCarsService,
  ) { }

  ngOnInit(): void {
    this.getCustomCars();
  }

  getCustomCars() {
    this.customCarsService.getCustomCars().subscribe(
      (res) => {
        const customCars = res.cars.map((car: customCarInterface) => {
          if (car.imgs !== null) {
            return {
              ...car,
              imgs: car.imgs.split(','),
            }
          }

          return {
            ...car,
            imgs: '',
          }
        })

        this.cars = customCars;
      },
      (err) => {
        console.error(err);
      }
    );
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
