import { basicCarInterface, basicCarsGrouped, basicGlobalGroup, premiumCarInterface, premiumCarsGrouped, premiumGlobalGroup } from "../models/cardTypes.interface";


export const filterSeries = (
  groupedCars: any[], 
  serie: string
) => {
    return groupedCars.map((group: any) => {
        switch (serie) {
          case 'ALL':
            return {
              ...group,
              visible: true
            }
            
          default:
            return {
              ...group,
              visible: group.serieName === serie
            }
        }
    });
}

export const filterSeriesOwned = (
  groupedCars: any[], 
  selectedOwned: string,
  selectedSerie: string
) => {
  let carsShowed = 0;
  let carsOwned = 0;
  
  for (let group of groupedCars) {
    if (selectedSerie === group.serieName || selectedSerie === 'ALL') {
      group.cars = group.cars.map((car: any) => {
        let visible = true;
        carsShowed++;

        car.has_car ? carsOwned++ : null;

        switch (selectedOwned) {
          case 'FILTER_CARS_OWNED':
            visible = car.has_car;
            break;
          case 'FILTER_CARS_NOT_OWNED':
            visible = !car.has_car;
            break;
          case 'FILTER_CARS_WISHED':
            visible = car.wants_car;
            break;
        }

        return {
          ...car,
          visible
        }
      });

      if (!group.cars.some((car: any) => car.visible)) {
        group.visible = false;
      } else group.visible = true;
    }
  }

  return {
    groupedCars,
    carsShowed,
    carsOwned
  };
}

export const createSpecialGroup = (carsGrouped: basicCarsGrouped[], serieName: string, carsGroupedSeries: number) => {
  carsGrouped = hideAllGroups(carsGrouped, carsGroupedSeries);

  const especialGroup: basicCarsGrouped = {
    serieName,
    cars: [],
    visible: true
  }

  carsGrouped.forEach((group: basicCarsGrouped) => {
    group.cars.forEach((car: basicCarInterface) => {
      if (car.series.includes(serieName)) {
        especialGroup.cars.push({
          ...car,
          visible: true
        });
      }
    })
  });

  carsGrouped[carsGroupedSeries] = especialGroup;

  return carsGrouped;
}

export const hideAllGroups = (carsGrouped: basicCarsGrouped[], carsGroupedSeries: number) => {
  carsGrouped[carsGroupedSeries] = {
    serieName: '',
    cars: [],
    visible: false
  };

  return carsGrouped.map((group: basicCarsGrouped) => {
    group.cars = group.cars.map((car: basicCarInterface) => {
      return {
        ...car,
        visible: false
      }
    });

    return {
      ...group,
      visible: false
    }
  })
}

export const filterYear = (basicGlobalGroup: basicGlobalGroup[], year?: string) => {
  return basicGlobalGroup.map((group: basicGlobalGroup) => {
    group.series = group.series.map((serie: basicCarsGrouped) => {
      serie.cars = serie.cars.map((car: basicCarInterface) => {
        return {
          ...car,
          visible: true
        }
      })

      return {
        ...serie,
        visible: true
      }
    })

    return {
      ...group,
      visible: year ? group.year === year : true
    }
  });
}

export const filterMainSerie = (premiumGlobalGroup: premiumGlobalGroup[], mainSerie?: string) => {
  return premiumGlobalGroup.map((group: premiumGlobalGroup) => {
    group.secondarySeries = group.secondarySeries.map((serie: premiumCarsGrouped) => {
      serie.cars = serie.cars.map((car: premiumCarInterface) => {
        return {
          ...car,
          visible: true
        }
      })

      return {
        ...serie,
        visible: true
      }
    })

    return {
      ...group,
      visible: mainSerie ? group.mainSerie === mainSerie : true
    }
  });
}