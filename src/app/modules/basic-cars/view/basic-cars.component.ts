import { Component } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { BasicCarsService } from '../services/basic-cars.service';
import { BasicCarsResponse } from '../models/basic-cars.models';

@Component({
  selector: 'basic-cars',
  templateUrl: './basic-cars.component.html',
  styleUrls: ['./basic-cars.component.scss'],
})
export class BasicCarsView {
  //#region MAIN VM
  public mainVM$: Observable<BasicCarsResponse[]>;
  //#endregion MAIN VM

  constructor(private basicCarsService: BasicCarsService) {
    this.mainVM$ = this.getBasicCars('2023');
  }

  private getBasicCars(year: string): Observable<BasicCarsResponse[]> {
    return this.basicCarsService
      .getCarsByYear(year)
      .pipe(map((response) => response));
  }
}
