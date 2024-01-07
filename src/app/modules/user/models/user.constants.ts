import { SLIDE_MENU_OPTIONS } from '../components/slide-menu/slide-menu.models';

export const CAR_TYPE_OPTIONS: SLIDE_MENU_OPTIONS[] = [
  {
    key: 'user.header.basicCars',
    value: 'basic',
  },
  {
    key: 'user.header.premiumCars',
    value: 'premium',
  },
  {
    key: 'user.header.customCars',
    value: 'custom',
  },
];

export const CAR_OWNERSHIP_OPTIONS: SLIDE_MENU_OPTIONS[] = [
  {
    key: 'user.filter.ownedCars',
    value: 'owned',
  },
  {
    key: 'user.filter.wishedCars',
    value: 'wished',
  },
];
