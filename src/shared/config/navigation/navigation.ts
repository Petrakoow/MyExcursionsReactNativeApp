export enum AppNavigation {
    SIGN_UP = 'Sign Up',
    SIGN_IN = 'Sing In',
    FORGOT_PASSWORD = 'Forgot password',
    MAIN = 'Main',
}

export type NavigationStackList<F = any> = {
    [AppNavigation.SIGN_IN]: undefined;
    [AppNavigation.SIGN_UP]: undefined;
    [AppNavigation.FORGOT_PASSWORD] : undefined;
    [AppNavigation.MAIN]: undefined;
};

export type RootStackParamList = NavigationStackList; // Расширяемый тип
