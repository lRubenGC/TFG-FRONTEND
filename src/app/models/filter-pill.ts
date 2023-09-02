export interface IFilterPillProps {
  label: string;
  options?: string[];
  selected: string;
  selectDisabled: boolean;
  basicDefaultSeries?: boolean;
  premiumDefaultSeries?: boolean;
  customDefaultOptions?: boolean;
  basicDefaultOptions?: boolean;
}

export interface IDefaultSeries {
  value: string;
  text: string;
}

export const BasicDefaultSeries: IDefaultSeries[] = [
  {
    value: 'All',
    text: 'FILTER_ALL',
  },
  {
    value: 'Treasure Hunt',
    text: 'Treasure Hunt',
  },
  {
    value: 'Super Treasure Hunt',
    text: 'Super Treasure Hunt',
  },
  {
    value: 'Red Edition',
    text: 'Red Edition',
  },
  {
    value: 'Walmart Exclusive',
    text: 'Zamac',
  },
];

export const PremiumDefaultSeries: IDefaultSeries[] = [
  {
    value: 'All',
    text: 'FILTER_ALL',
  },
];

export const CustomDefaultOptions: IDefaultSeries[] = [
  {
    value: 'date_recents',
    text: 'DATE_RECENTS',
  },
  {
    value: 'date_olders',
    text: 'DATE_OLDERS',
  },
  {
    value: 'upvotes',
    text: 'UPVOTES',
  },
];

export const BasicDefaultYears: IDefaultSeries[] = [
  {
    value: 'All',
    text: 'FILTER_ALL',
  },
];