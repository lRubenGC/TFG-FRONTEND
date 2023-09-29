

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