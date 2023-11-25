import { IBASIC_CAR } from 'src/app/shared/models/basic-cars-shared.models';

export interface BasicCarsResponse {
  serieName: string;
  cars: IBASIC_CAR[];
}

export interface FiltersBody {
  mainSerie?: string;
  userProperty?: USER_PROPERTY;
}

export enum USER_PROPERTY {
  ALL = 'all',
  OWNED = 'owned',
  WISHED = 'wished',
  NOT_OWNED = 'not_owned',
}

export function isUserProperty(value: string): value is USER_PROPERTY {
  return (
    value === 'all' ||
    value === 'owned' ||
    value === 'wished' ||
    value === 'not_owned'
  );
}

export interface GET_CAR_BY_ID_RESPONSE {
  car: IBASIC_CAR;
  year: string;
}

export interface IOWNED_CARS {
  carsOwned: number;
  carsShowed: number;
}

export class owned_cars {
  carsOwned: number = 0;
  carsShowed: number = 0;
}
