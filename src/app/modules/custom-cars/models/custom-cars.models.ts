export interface ICUSTOM_CAR {
  id: number;
  model_name: string;
  imgs: (CUSTOM_CAR_IMGS | undefined)[];
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

export interface CUSTOM_CAR_IMGS {
  itemImageSrc?: string;
  thumbnailImageSrc?: string;
  alt?: string;
  title?: string;
}

export interface CUSTOM_CAR_FORM {
  model_name: string;
  imgs: File[];
}
