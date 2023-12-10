export interface ICUSTOM_CAR {
  id: number;
  model_name: string;
  imgs: string[];
  upvotes: number;
  userCreator: string;
  createdAt: Date;
  isVoted?: boolean;
}

export type CUSTOM_CARS_ORDER_TYPE =
  | 'DATE_ASC'
  | 'DATE_DESC'
  | 'UPVOTES_ASC'
  | 'UPVOTES_DESC';

