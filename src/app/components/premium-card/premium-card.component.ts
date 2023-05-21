import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { premiumCarShowedInterface } from 'src/app/models/cardTypes.interface';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-premium-card',
  templateUrl: './premium-card.component.html',
  styleUrls: ['./premium-card.component.css', '../styles/car-cards.css']
})
export class PremiumCardComponent implements OnInit {

  @Output() errorEvent = new EventEmitter<string>();
  @Input() car!: premiumCarShowedInterface;

  constructor(
    private carsService: CarsService,
  ) { }

  ngOnInit(): void {
  }

  // Adds car to collection or wishlist depending on hasCar param
  addCar(hasCar: any) {
    const carBody = hasCar ? { hasCar: true, wantsCar: false } : { hasCar: false, wantsCar: true };

    if (this.car.token) {
      this.carsService
        .addPremiumCar(parseInt(this.car.id), this.car.token, carBody)
        .subscribe(
          (res) => {
            if (carBody.hasCar) {
              this.car.has_car = true;
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
      .removePremiumCar(parseInt(this.car.id), this.car.token)
      .subscribe(
        (res) => {
          if (this.car.has_car) {
            this.car.has_car = false;
          } else if (this.car.wants_car) {
            this.car.wants_car = false;
          }
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

}
