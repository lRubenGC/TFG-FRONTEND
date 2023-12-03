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

export interface IBASIC_CAR {
  id: number;
  car_id: string;
  col: string;
  model_name: string;
  version: string;
  series: string;
  col_serie: string;
  year: string;
  brand: string;
  img: string;
  has_car?: boolean;
  wants_car?: boolean;
  exclusive?: number;
}

export interface IPROPERTY_TYPE {
  hasCar?: boolean;
  wantsCar?: boolean;
}
