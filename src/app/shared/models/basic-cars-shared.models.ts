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
