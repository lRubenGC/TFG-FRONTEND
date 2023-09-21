import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { premiumCarShowedInterface } from 'src/app/models/cardTypes.interface';
import { CarsService } from '../services/cars.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-premium-card',
  templateUrl: './premium-card.component.html',
  styleUrls: ['./premium-card.component.css', '../styles/car-cards.css']
})
export class PremiumCardComponent implements OnInit {

  @Output() deleteCar = new EventEmitter<premiumCarShowedInterface>();
  @Output() addedCar = new EventEmitter<premiumCarShowedInterface>();
  @Output() errorEvent = new EventEmitter<string>();
  @Input() car!: premiumCarShowedInterface;

  constructor(
    private carsService: CarsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  // Adds car to collection or wishlist depending on hasCar param
  addCar(hasCar: any) {
    const carBody = hasCar ? { hasCar: true, wantsCar: false } : { hasCar: false, wantsCar: true };

    if (this.car.token) {
      this.carsService
        .addPremiumCar(this.car.id, this.car.token, carBody)
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
      .removePremiumCar(this.car.id, this.car.token)
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

  goToDetailedCar() {
    this.router.navigate([`/detailed-car/premium/${this.car.id}`]);
  }

}
