import { IBASIC_CAR } from '../../basic-cars/models/basic-cars.models';
import { IPREMIUM_CAR } from '../../premium-cars/models/premium-cars.models';

export interface SEARCH_CARS_FILTERS {
  car_type: CAR_TYPE;
}

export interface SEARCH_CARS_ORDER {
  year: ORDER_TYPE;
}

export type SEARCH_TYPE = 'cars' | 'users';
export function isSearchType(value: string): value is SEARCH_TYPE {
  return value === 'cars' || value === 'users';
}
export type CAR_TYPE = 'all' | 'basic' | 'premium';
export function isCarType(value: string): value is CAR_TYPE {
  return value === 'all' || value === 'basic' || value === 'premium';
}
export type ORDER_TYPE = 'DATE_ASC' | 'DATE_DESC';
export function isOrderType(value: string): value is ORDER_TYPE {
  return value === 'DATE_ASC' || value === 'DATE_DESC';
}

export interface SEARCH_CARS_RESPONSE {
  basicCars: IBASIC_CAR[];
  basicCarsShowedNumbered: number;
  basicCarsOwnedNumbered: number;
  premiumCars: IPREMIUM_CAR[];
  premiumCarsShowedNumbered: number;
  premiumCarsOwnedNumbered: number;
}
