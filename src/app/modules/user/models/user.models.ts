import { IUSER_DATA } from "../../auth/models/auth.models";

export interface IUSER_CARS_NUMBERS {
  basicCars: number;
  premiumCars: number;
  customCars: number;
}

export interface USER_VM {
  userData: IUSER_DATA;
  userNumbers: IUSER_CARS_NUMBERS
}