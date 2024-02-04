import { CAR_TYPE, ORDER_TYPE, SEARCH_TYPE } from './search-results.models';

export const SEARCH_TYPE_OPTIONS: SEARCH_TYPE[] = ['cars', 'users'];

export const SEARCH_CARS_FILTERS_OPTIONS: CAR_TYPE[] = [
  'all',
  'basic',
  'premium',
];

export const SEARCH_CARS_ORDER_OPTIONS: ORDER_TYPE[] = [
  'DATE_DESC',
  'DATE_ASC',
];
