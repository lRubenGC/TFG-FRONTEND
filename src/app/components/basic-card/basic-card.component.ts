import { Component, Input, OnInit } from '@angular/core';
import { decodeToken } from 'src/app/helpers/generics';

import { basicCarInterface } from 'src/app/models/cardTypes.interface';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.css', '../styles/car-cards.css']
})
export class BasicCardComponent implements OnInit {

  @Input() car!: basicCarInterface;

  userToken = decodeToken();
  carCollected = false;
  carWanted = false;

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
        .subscribe((res) => {
          if (carBody.hasCar) {
            this.carCollected = true;
          } else if (carBody.wantsCar) {
            this.carWanted = true;
          }
        },
        (err) => {
          console.log(err.status)
        })
    }
  }

}
