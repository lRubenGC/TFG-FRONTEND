import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  lastValueFrom,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';
import {
  SEARCH_CARS_FILTERS_OPTIONS,
  SEARCH_CARS_ORDER_OPTIONS,
} from '../models/search-results.constants';
import {
  CAR_TYPE,
  SEARCH_CARS_FILTERS,
  SEARCH_CARS_ORDER,
  SEARCH_CARS_RESPONSE,
  YEAR_TYPE,
} from '../models/search-results.models';
import { SearchResultsService } from '../services/search-results.service';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsPage {
  //#region CAR TYPE FILTER
  public readonly CAR_TYPE_FILTER_OPTIONS = SEARCH_CARS_FILTERS_OPTIONS;
  public carTypeFilterSubject$ = new BehaviorSubject<CAR_TYPE>('all');
  //#endregion CAR TYPE FILTER

  //#region ORDER
  public readonly ORDER_OPTIONS = SEARCH_CARS_ORDER_OPTIONS;
  public orderSubject$ = new BehaviorSubject<YEAR_TYPE>('DATE_DESC');
  //#endregion ORDER

  //#region CARS VM
  public carsVM$: Observable<SEARCH_CARS_RESPONSE> = combineLatest([
    this.route.params,
    this.carTypeFilterSubject$,
    this.orderSubject$,
  ]).pipe(
    switchMap(([params, car_type, year]) => {
      if (params && car_type && year) {
        const filters: SEARCH_CARS_FILTERS = {
          car_type,
        };
        const order: SEARCH_CARS_ORDER = {
          year,
        };

        return this.getCars(params['query'], filters, order);
      } else return of();
    })
  );
  //#endregion CARS VM

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private searchResultsService: SearchResultsService,
    private translate: TranslateService
  ) {}

  private getCars(
    model_name: string,
    car_type: SEARCH_CARS_FILTERS,
    order: SEARCH_CARS_ORDER
  ): Observable<SEARCH_CARS_RESPONSE> {
    return this.searchResultsService
      .getCars(model_name, car_type, order)
      .pipe(map((response) => response));
  }

  public async showToast(toastObject: ITOAST_OBJECT) {
    const summaryT = this.translate.get(toastObject.summary);
    const summary = await lastValueFrom(summaryT);

    const detailT = this.translate.get(toastObject.detail);
    const detail = await lastValueFrom(detailT);

    this.messageService.add({
      key: 'br',
      severity: toastObject.severity,
      summary,
      detail,
      life: 2000,
    });
  }
}
