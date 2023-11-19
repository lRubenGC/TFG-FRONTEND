export interface BasicCarsResponse {
  serieName: string;
  cars: IBasicCar[];
}

export interface IBasicCar {
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
}

export interface FiltersBody {
  mainSerie?: string;
  userProperty?: USER_PROPERTY;
}

export enum USER_PROPERTY {
  ALL = 'ALL',
  OWNED = 'OWNED',
  WISHED = 'WISHED',
  NOT_OWNED = 'NOT_OWNED',
}

export function isUserProperty(value: string): value is USER_PROPERTY {
  return (
    value === 'ALL' ||
    value === 'OWNED' ||
    value === 'WISHED' ||
    value === 'NOT_OWNED'
  );
}
