import {TourTypeRequest} from '@/shared/api/sputnik8';

export enum AppNavigation {
    SIGN_UP = 'Sign Up',
    SIGN_IN = 'Sing In',
    FORGOT_PASSWORD = 'Forgot password',
    MAIN = 'Main',
    EXCURSION_INFO = 'Information about excursion',
}

export enum AppTabNavigation {
    HOME = 'Home',
    BOOKING = 'Booking',
    FAVOURITE = 'Favourite',
    USER = 'Profile',
    EXCURSIONS = 'Excursions',
}

export type NavigationStackList<F = any> = {
    [AppNavigation.SIGN_IN]: undefined;
    [AppNavigation.SIGN_UP]: undefined;
    [AppNavigation.FORGOT_PASSWORD]: undefined;
    [AppNavigation.MAIN]: undefined;
    [AppNavigation.EXCURSION_INFO]: {
        excursion: TourTypeRequest;
    };
};

export type NavigationTabList = {
    [AppTabNavigation.HOME]: undefined;
    [AppTabNavigation.FAVOURITE]: undefined;
    [AppTabNavigation.BOOKING]: undefined;
    [AppTabNavigation.USER]: undefined;
    [AppTabNavigation.EXCURSIONS]: undefined;
};

export type RootStackParamList = NavigationStackList & NavigationTabList; // Расширяемый тип
