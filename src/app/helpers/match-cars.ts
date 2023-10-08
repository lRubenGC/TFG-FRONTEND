import { basicCarInterface, basicCarsGrouped, basicGlobalGroup, premiumCarInterface, premiumCarsGrouped, premiumGlobalGroup } from "../models/cardTypes.interface";


export const matchCars = (
  userCarsResponse: any,
  groupedCars: any[],
  token: number,
  typeCar: string
) => {
  let carsOwned = 0;

  // Se añade la propiedad has_car | wants_car a cada coche que tenga | quiera y el ID del usuario
  for (let group of groupedCars) {
    group.cars = group.cars.map((car: premiumCarInterface | basicCarInterface) => {
      let has_car = false;
      let wants_car = false;

      if (typeCar === 'BASIC_CAR') {
        userCarsResponse.groupedOwnedCars.map((group: basicGlobalGroup) => {
          group.series.map((serie: basicCarsGrouped) => {
            if (serie.cars.some((carOwned: basicCarInterface) => carOwned.id === car.id)) {
              has_car = true;
              carsOwned++;
            }
          })
        });

        userCarsResponse.groupedWishedCars.map((group: basicGlobalGroup) => {
          group.series.map((serie: basicCarsGrouped) => {
            if (serie.cars.some((carWished: basicCarInterface) => carWished.id === car.id)) {
              wants_car = true;
            }
          })
        });

      } else if (typeCar === 'PREMIUM_CAR') {
        userCarsResponse.groupedOwnedCars.map((group: premiumGlobalGroup) => {
          group.secondarySeries.map((serie: premiumCarsGrouped) => {
            if (serie.cars.some((carOwned: premiumCarInterface) => carOwned.id === car.id)) {
              has_car = true;
              carsOwned++;
            }
          })
        });

        userCarsResponse.groupedWishedCars.map((group: premiumGlobalGroup) => {
          group.secondarySeries.map((serie: premiumCarsGrouped) => {
            if (serie.cars.some((carWished: premiumCarInterface) => carWished.id === car.id)) {
              wants_car = true;
            }
          })
        });
      }

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