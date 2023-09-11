import { customCarInterface } from "../models/cardTypes.interface";

export const mapAndSortCustomCars = (res: any, userVotes: number[] = [] as number[], userId?: number) => {
    let customCars = res.cars.map((car: customCarInterface) => {
        let carData = {
            ...car,
            imgs: car.imgs.split(',')
        }
        if (userId) {
            carData = {
                ...carData,
                userId: userId,
                voted: userVotes.includes(car.id)
            };
        }
        return carData;
    });
  
    // sort by 'createdAt' in descending order (most recent first)
    customCars.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return customCars;
}