import {AppNavigation, AppTabNavigation} from '@/shared/config/navigation/types';
import {ToursPageScreen} from '@/pages/tours';
import {HomePage} from '@/pages/home';
import {ExcursionFavoritesListPageScreen} from '@/pages/favorites/excursionList';
import {ProfilePageScreen} from '@/pages/profile';
import {BookingPageScreen} from '@/pages/booking';
import * as Icons from '@/shared/assets/icons';
import { RolesEnum } from '@/entities/user/model';
import { AuthScreen } from '@/pages/auth/signIn';
import { RegistrationScreen } from '@/pages/auth/signUp';

export const screens = [
    {
        name: AppTabNavigation.EXCURSIONS,
        component: ToursPageScreen,
        title: 'Excursions',
        roles: [RolesEnum.USER, RolesEnum.GUEST],
        Icon: Icons.Tours,
    },
    {
        name: AppTabNavigation.FAVOURITE,
        component: ExcursionFavoritesListPageScreen,
        title: 'Favourite',
        roles: [RolesEnum.USER],
        Icon: Icons.Favourite,
    },
    {
        name: AppTabNavigation.HOME,
        component: HomePage,
        title: 'Home',
        roles: [RolesEnum.USER, RolesEnum.GUEST],
        Icon: Icons.Home,
    },
    {
        name: AppTabNavigation.BOOKING,
        component: BookingPageScreen,
        title: 'Booking',
        roles: [RolesEnum.USER],
        Icon: Icons.Booking,
    },
    {
        name: AppTabNavigation.USER,
        component: ProfilePageScreen,
        title: 'Profile',
        roles: [RolesEnum.USER],
        Icon: Icons.User,
    },
    {
        name: AppNavigation.SIGN_IN,
        component: AuthScreen,
        title: 'Sign In',
        roles: [RolesEnum.GUEST],
        Icon: Icons.User,
    },
    {
        name: AppNavigation.SIGN_UP,
        component: RegistrationScreen,
        title: 'Sign Up',
        roles: [RolesEnum.GUEST],
        Icon: Icons.Booking,
    },
];
