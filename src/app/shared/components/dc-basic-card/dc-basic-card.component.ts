import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IBasicCar } from 'src/app/modules/basic-cars/models/basic-cars.models';
import { decodeToken } from '../../functions/token-functions';
import { IPROPERTY_TYPE } from '../../models/basic-cars-shared.models';
import { userIdToken } from '../../models/token-shared.models';
import { BasicCarsSharedService } from '../../services/basic-cars-shared.service';

@Component({
  selector: 'dc-basic-card',
  standalone: true,
  templateUrl: './dc-basic-card.component.html',
  styleUrls: ['./dc-basic-card.component.scss'],
  imports: [CommonModule],
})
export class DcBasicCardComponent implements OnInit {
  //#region INPUTS
  @Input() car!: IBasicCar;
  @Input() showYear?: boolean = false;
  //#endregion INPUTS

  //#region PROPS
  private userToken: userIdToken = { hasToken: false };
  //#endregion PROPS

  async ngOnInit() {
    this.userToken = await decodeToken();
  }

  constructor(private basicCarsSharedService: BasicCarsSharedService) {}

  public addCar(propertyType: IPROPERTY_TYPE) {
    if (this.userToken.userId) {
      this.basicCarsSharedService
        .addCarToUser(this.userToken.userId, this.car.id, propertyType)
        .subscribe({
          next: (resp) => {
            if (propertyType.hasCar) {
              this.car.has_car = true;
              this.car.wants_car = false;
            } else this.car.wants_car = true;
          },
          error: (error) => {},
        });
    }
  }

  public removeCar() {
    if (this.userToken.userId) {
      this.basicCarsSharedService
        .removeBasicCar(this.userToken.userId, this.car.id)
        .subscribe({
          next: (resp) => {
            this.car.has_car = false;
            this.car.wants_car = false;
          },
          error: (error) => {},
        });
    }
  }
}
