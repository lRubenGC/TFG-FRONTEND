import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type CAR_PROPERTY = 'has_car' | 'wants_car' | 'remove_car';
interface CAR_PROPERTY_SUBJECT {
  carProperty: CAR_PROPERTY;
  carId: number | string;
}

@Injectable({
  providedIn: 'root',
})
export class DcBasicCarDetailedService {
  private carPropertySubject = new Subject<CAR_PROPERTY_SUBJECT>();
  public carProperty$ = this.carPropertySubject.asObservable();

  updateCarProperty(carProperty: CAR_PROPERTY, carId: number | string) {
    this.carPropertySubject.next({ carProperty, carId });
  }
}
