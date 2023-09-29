import { basicCarInterface, premiumCarInterface } from "../models/cardTypes.interface";


export const matchCars = (
  userCarsResponse: any,
  groupedCars: any[], 
  token: number
) => {
  let carsOwned = 0;

  // Se añade la propiedad has_car | wants_car a cada coche que tenga | quiera y el ID del usuario
  for (let group of groupedCars) {
    group.cars = group.cars.map((car: premiumCarInterface | basicCarInterface) => {
      let has_car = false;
      let wants_car = false;

      if (userCarsResponse.carsOwned.some((carOwned: premiumCarInterface | basicCarInterface) => carOwned.id === car.id)) {
        has_car = true;
        carsOwned++;
      }
      if (userCarsResponse.carsWished.some((carWished: premiumCarInterface | basicCarInterface) => carWished.id === car.id)) wants_car = true;

      return {
        ...car,
        has_car,
        wants_car,
        token
      };
    });
  }

  return {
    groupedCars,
    carsOwned
  };
}