import {TourTypeRequest} from '@/shared/api';

export enum AppNavigation {
    SIGN_UP = 'Sign Up',
    SIGN_IN = 'Sign In',
    FORGOT_PASSWORD = 'Forgot password',
    MAIN = 'Main',
    EXCURSION_INFO = 'Information about excursion',
    BOOKING = 'Booking',
}

export enum AppTabNavigation {
    HOME = 'Home',
    BOOKING = 'Booking',
    FAVOURITE = 'Favorite',
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
    [AppNavigation.BOOKING]: undefined;
};

export type NavigationTabList = {
    [AppTabNavigation.HOME]: undefined;
    [AppTabNavigation.FAVOURITE]: undefined;
    [AppTabNavigation.BOOKING]: undefined;
    [AppTabNavigation.USER]: undefined;
    [AppTabNavigation.EXCURSIONS]: undefined;
    [AppNavigation.SIGN_IN]: undefined;
};

export type RootStackParamList = NavigationStackList & NavigationTabList; // Расширяемый тип
