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
    value: 'ALL',
    text: 'FILTER_ALL',
  }
];

export const PremiumDefaultSeries: IDefaultSeries[] = [
  {
    value: 'ALL',
    text: 'FILTER_ALL',
  },
];

export const BasicDefaultYears: IDefaultSeries[] = [
  {
    value: 'ALL',
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