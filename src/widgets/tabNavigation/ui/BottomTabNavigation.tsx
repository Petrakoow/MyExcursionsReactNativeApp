import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBarIcon} from './TabBarIcon';
import React from 'react';
import {NavigationTabList} from '@/shared/config/navigation/types';
import {AppTabNavigation} from '@/shared/config/navigation/types';
import {HomePage} from '@/pages/home/main';
import {ToursPageScreen} from '@/pages/tours';
import {Colors} from '@/shared/config/colors';
import * as Icons from '@/shared/assets/icons';
import {screenOptions} from './BottomTabNavigationStyle';
import {getEnumTranslation} from '@/shared/config/navigation';
import { ExcursionFavoritesListPageScreen } from '@/pages/favorites/excursionList';

const Tab = createBottomTabNavigator<NavigationTabList>();

export const BottomTabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={{...screenOptions}}>
            <Tab.Screen
                name={AppTabNavigation.EXCURSIONS}
                component={ToursPageScreen}
                options={{
                    title: getEnumTranslation(AppTabNavigation.EXCURSIONS),
                    headerTransparent: true,
                    headerTitle: '',
                    tabBarIcon: ({focused}) =>
                        TabBarIcon({
                            colorFocus: Colors.tabs.focus,
                            colorUnfocus: Colors.tabs.unfocus,
                            focused: focused,
                            Icon: Icons.Tours,
                        }),
                }}
            />
            <Tab.Screen
                name={AppTabNavigation.FAVOURITE}
                component={ExcursionFavoritesListPageScreen}
                options={{
                    title: getEnumTranslation(AppTabNavigation.FAVOURITE),
                    headerTransparent: true,
                    headerTitle: '',
                    tabBarIcon: ({focused}) =>
                        TabBarIcon({
                            colorFocus: Colors.tabs.focus,
                            colorUnfocus: Colors.tabs.unfocus,
                            focused: focused,
                            Icon: Icons.Favourite,
                        }),
                }}
            />
            <Tab.Screen
                name={AppTabNavigation.HOME}
                component={HomePage}
                options={{
                    title: getEnumTranslation(AppTabNavigation.HOME),
                    headerTransparent: true,
                    headerTitle: '',
                    tabBarIcon: ({focused}) =>
                        TabBarIcon({
                            colorFocus: Colors.tabs.focus,
                            colorUnfocus: Colors.tabs.unfocus,
                            focused: focused,
                            Icon: Icons.Home,
                        }),
                }}
            />
            <Tab.Screen
                name={AppTabNavigation.BOOKING}
                component={HomePage}
                options={{
                    title: getEnumTranslation(AppTabNavigation.BOOKING),
                    headerTransparent: true,
                    headerTitle: '',
                    tabBarIcon: ({focused}) =>
                        TabBarIcon({
                            colorFocus: Colors.tabs.focus,
                            colorUnfocus: Colors.tabs.unfocus,
                            focused: focused,
                            Icon: Icons.Booking,
                        }),
                }}
            />
            <Tab.Screen
                name={AppTabNavigation.USER}
                component={HomePage}
                options={{
                    title: getEnumTranslation(AppTabNavigation.USER),
                    headerTransparent: true,
                    headerTitle: '',
                    tabBarIcon: ({focused}) =>
                        TabBarIcon({
                            colorFocus: Colors.tabs.focus,
                            colorUnfocus: Colors.tabs.unfocus,
                            focused: focused,
                            Icon: Icons.User,
                        }),
                }}
            />
        </Tab.Navigator>
    );
};
