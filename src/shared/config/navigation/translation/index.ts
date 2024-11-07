import {AppNavigation, AppTabNavigation} from '../types';

export const enumTranslations = {
    [AppNavigation.SIGN_UP]: 'Регистрация',
    [AppNavigation.SIGN_IN]: 'Вход',
    [AppNavigation.FORGOT_PASSWORD]: 'Забыли пароль',
    [AppNavigation.MAIN]: 'Главная',
    [AppNavigation.EXCURSION_INFO]: 'Информация об экскурсии',

    [AppTabNavigation.HOME]: 'Домой',
    [AppTabNavigation.BOOKING]: 'Бронь',
    [AppTabNavigation.FAVOURITE]: 'Избранное',
    [AppTabNavigation.USER]: 'Профиль',
    [AppTabNavigation.EXCURSIONS]: 'Экскурсии',
};

export const getEnumTranslation = (
    key: AppNavigation | AppTabNavigation,
): string => {
    return enumTranslations[key] || key;
};
