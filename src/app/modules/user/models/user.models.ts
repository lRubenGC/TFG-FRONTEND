import { IUSER_DATA } from '../../auth/models/auth.models';

export interface IUSER_CARS_NUMBERS {
  basicCars: number;
  premiumCars: number;
  customCars: number;
}

export interface USER_VM {
  userData: IUSER_DATA;
  userNumbers: IUSER_CARS_NUMBERS;
  userVisitorId: number;
}

export class CarTypeOption {
  key: string;
  value: CAR_TYPE;

  constructor(key: string, value: CAR_TYPE) {
    this.key = key;
    this.value = value;
  }
}

export class CarOwnershipOption {
  key: string;
  value: CAR_OWNERSHIP;

  constructor(key: string, value: CAR_OWNERSHIP) {
    this.key = key;
    this.value = value;
  }
}

export type CAR_TYPE = 'basic' | 'premium' | 'custom';
export type CAR_OWNERSHIP = 'owned' | 'wished';

export interface BASIC_FILTERS {
  year: string[];
  mainSerie: string[];
}

export interface PREMIUM_FILTERS {
  main_serie: string[];
  secondarySerie: string[];
}

export type USER_PROPERTY = 'owned' | 'wished';
