export enum AppNavigation {
    SIGN_UP = 'Sign Up',
    SIGN_IN = 'Sing In',
    FORGOT_PASSWORD = 'Forgot password',
    MAIN = 'Main',
    BOOKING = 'Booking',
    FAVOURITE = 'Favourite',
}

export enum AppTabNavigation {
    MAIN = 'Main',
    BOOKING = 'Booking',
    FAVOURITE = 'Favourite',
}

export type NavigationStackList<F = any> = {
    [AppNavigation.SIGN_IN]: undefined;
    [AppNavigation.SIGN_UP]: undefined;
    [AppNavigation.FORGOT_PASSWORD]: undefined;
    [AppNavigation.MAIN]: undefined;
    [AppNavigation.FAVOURITE]: undefined;
    [AppNavigation.BOOKING]: undefined;
};

export type NavigationTabList = {
    [AppTabNavigation.MAIN]: undefined;
    [AppTabNavigation.FAVOURITE]: undefined;
    [AppTabNavigation.BOOKING]: undefined;
};

export type RootStackParamList = NavigationStackList & NavigationTabList; // Расширяемый тип
