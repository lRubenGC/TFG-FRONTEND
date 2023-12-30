import { IBASIC_CAR } from '../../basic-cars/models/basic-cars.models';
import { IPREMIUM_CAR } from '../../premium-cars/models/premium-cars.models';

export interface SEARCH_CARS_FILTERS {
  car_type: CAR_TYPE;
}

export interface SEARCH_CARS_ORDER {
  year: YEAR_TYPE;
}

export type CAR_TYPE = 'all' | 'basic' | 'premium';
export type YEAR_TYPE = 'DATE_ASC' | 'DATE_DESC';

export interface SEARCH_CARS_RESPONSE {
  basicCars: IBASIC_CAR[];
  premiumCars: IPREMIUM_CAR[];
}
