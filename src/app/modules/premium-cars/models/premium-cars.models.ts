export interface PremiumCarsResponse {
  serieName: string;
  cars: IPREMIUM_CAR[];
}

export interface FiltersBody {
  secondarySerie?: string;
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
  car: IPREMIUM_CAR;
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

export interface IPREMIUM_CAR {
  id: number;
  car_id: string;
  model_name: string;
  main_serie: string;
  secondary_serie: string;
  col_serie: string;
  year: string;
  brand: string;
  img: string;
  card_img: string;
  has_car?: boolean;
  wants_car?: boolean;
  token?: string;
}

export interface IPROPERTY_TYPE {
  hasCar?: boolean;
  wantsCar?: boolean;
}
