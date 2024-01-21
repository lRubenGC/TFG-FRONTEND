import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type CAR_PROPERTY = 'has_car' | 'wants_car' | 'remove_car';
export interface CAR_PROPERTY_SUBJECT {
  carProperty: CAR_PROPERTY;
  carId: number | string;
}

export const isCarProperty = (value: any): value is CAR_PROPERTY_SUBJECT => {
  return (
    value !== null &&
    typeof value === 'object' &&
    'carProperty' in value &&
    'carId' in value &&
    (value.carProperty === 'has_car' ||
      value.carProperty === 'wants_car' ||
      value.carProperty === 'remove_car') &&
    (typeof value.carId === 'number' || typeof value.carId === 'string')
  );
};

@Injectable({
  providedIn: 'root',
})
export class DcPremiumCarDetailedService {
  public carPropertySubject = new BehaviorSubject<
    CAR_PROPERTY_SUBJECT | string
  >('');
  public carProperty$ = this.carPropertySubject.asObservable();

  updateCarProperty(carProperty: CAR_PROPERTY, carId: number | string) {
    this.carPropertySubject.next({ carProperty, carId });
  }
}
