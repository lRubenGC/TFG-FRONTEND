import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { decodeToken } from 'src/app/helpers/generics';

import { basicCarInterface, basicCarShowedInterface } from 'src/app/models/cardTypes.interface';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.css', '../styles/car-cards.css']
})
export class BasicCardComponent implements OnInit {

  @Output() carAdded: EventEmitter<any> = new EventEmitter<any>();
  @Input() car!: basicCarShowedInterface;

  userToken = decodeToken();

  constructor(
    private carsService: CarsService
  ) { }

  ngOnInit(): void {
  }

  // Adds car to collection or wishlist depending on hasCar param
  addCar(hasCar: any) {
    const carBody = hasCar ? { hasCar: true, wantsCar: false } : { hasCar: false, wantsCar: true };

    if (this.userToken.hasToken && this.userToken.userId) {
      this.carsService
        .addBasicCar(parseInt(this.car.id), this.userToken.userId, carBody)
        .subscribe(
          (res) => {
            if (carBody.hasCar) {
              this.car.has_car = true;
            } else if (carBody.wantsCar) {
              this.car.wants_car = true;
            }
          },
          (err) => {
            console.log(err.status);
          }
        );
    }
  }

  removeCar() {
    console.log('borrado')
  }

}
