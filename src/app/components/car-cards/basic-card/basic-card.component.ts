import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { basicCarShowedInterface } from 'src/app/models/cardTypes.interface';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.css', '../styles/car-cards.css']
})
export class BasicCardComponent implements OnInit {

  @Output() deleteCar = new EventEmitter<basicCarShowedInterface>();
  @Output() addedCar = new EventEmitter<basicCarShowedInterface>();
  @Output() errorEvent = new EventEmitter<string>();
  @Input() car!: basicCarShowedInterface;

  carClicked: boolean = false;

  constructor(
    private carsService: CarsService
  ) { }

  ngOnInit(): void {
  }

  // Adds car to collection or wishlist depending on hasCar param
  addCar(hasCar: any) {
    const carBody = hasCar ? { hasCar: true, wantsCar: false } : { hasCar: false, wantsCar: true };

    if (this.car.token) {
      this.carsService
        .addBasicCar(this.car.id, this.car.token, carBody)
        .subscribe(
          (res) => {
            if (carBody.hasCar) {
              this.car.has_car = true;
              this.addedCar.emit(this.car);
            } else if (carBody.wantsCar) {
              this.car.wants_car = true;
            }
          },
          (err) => {
            console.error(err)
            
            switch (err.status) {
              case 401:
                this.errorEvent.emit('GN_TOKEN_EXPIRED');
                break;
              default:
                this.errorEvent.emit('GN_UNEXPECTED_ERROR');
            }
            
          }
        );
    } else {
      this.errorEvent.emit('GN_TOKEN_EXPIRED');
    }
  }

  removeCar() {
    if (this.car.token) {
      this.carsService
      .removeBasicCar(this.car.id, this.car.token)
      .subscribe(
        (res) => {
          if (this.car.has_car) {
            this.car.has_car = false;
          } else if (this.car.wants_car) {
            this.car.wants_car = false;
          }

          this.deleteCar.emit(this.car);
        },
        (err) => {
          switch (err.status) {
            case 401:
              this.errorEvent.emit('GN_TOKEN_EXPIRED');
              break;
            default:
              this.errorEvent.emit('GN_UNEXPECTED_ERROR');
          }
          
        }
      );
    }
  }

  onCarClick() {
    this.carClicked = !this.carClicked;
  }
  
}
