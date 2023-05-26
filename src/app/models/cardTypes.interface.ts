export interface basicCarInterface {
    id: string;
    car_id: string;
    col: string;
    model_name: string;
    version: string;
    series: string;
    col_serie: string;
    img: string;
    brand: string;
    year: string;
    serie_class: string;
}

export interface basicCarShowedInterface {
    id: string;
    car_id: string;
    col: string;
    model_name: string;
    version: string;
    series: string;
    col_serie: string;
    img: string;
    brand: string;
    year: string;
    serie_class: string;
    has_car: boolean;
    wants_car: boolean;
    token: number;
    search?: boolean;
    user_profile?: boolean;
    profile_view?: boolean;
}

export interface premiumCarInterface {
    id: string;
    car_id: string;
    model_name: string;
    main_serie: string;
    secondary_serie: string;
    col_serie: string;
    year: string;
    brand: string;
    img: string;
    card_img: string;
}

export interface premiumCarShowedInterface {
    id: string;
    car_id: string;
    model_name: string;
    main_serie: string;
    secondary_serie: string;
    col_serie: string;
    year: string;
    brand: string;
    img: string;
    card_img: string;
    has_car: boolean;
    wants_car: boolean;
    token: number;
    search?: boolean;
    user_profile?: boolean;
    profile_view?: boolean;
}