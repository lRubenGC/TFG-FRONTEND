export interface basicCarInterface {
    id: number;
    car_id: string;
    col: string;
    model_name: string;
    version: string;
    series: string;
    col_serie: string;
    img: string;
    brand: string;
    year: string;
    // ^ car properties from backend ^
    serie_class: string; // property for printing a colored square
    has_car: boolean; // property that confirms user has car
    wants_car: boolean; // property that confirms user wants car
    token: number; // id of user
    search?: boolean; // property to show year property in card
    profile_view?: boolean; // property that confirms that card is used in user_profile view
    user_profile?: boolean; // property that confirms that user is in his own profile
    visible: boolean;
}

export interface premiumCarInterface {
    id: number;
    car_id: string;
    model_name: string;
    main_serie: string;
    secondary_serie: string;
    col_serie: string;
    year: string;
    brand: string;
    img: string;
    card_img: string;
    // ^ car properties from backend ^
    has_car: boolean;
    wants_car: boolean;
    token: number;
    search?: boolean;
    user_profile?: boolean;
    profile_view?: boolean;
    visible: boolean;
}

export interface customCarInterface {
    id: number;
    car_id: string;
    model_name: string;
    year: string;
    brand: string;
    imgs: any;
    upvotes: number;
    userCreator: number;
    createdAt: Date;
    userId?: number;
    voted?: boolean;
}

export interface customCarUpdateRequest {
    car_id?: string;
    model_name?: string;
    year?: number;
    brand?: string;
}

export interface basicCarsGrouped {
    serieName: string;
    cars: basicCarInterface[];
    visible: boolean;
}

export interface premiumCarsGrouped {
    serieName: string;
    cars: premiumCarInterface[];
    visible: boolean;
}

export interface basicGlobalGroup {
    year: string;
    series: basicCarsGrouped[];
    visible: boolean
}

export interface premiumGlobalGroup {
    mainSerie: string;
    secondarySeries: premiumCarsGrouped[];
    visible: boolean
}