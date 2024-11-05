import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBarIcon} from './TabBarIcon';
import React from 'react';
import {NavigationTabList} from '@/shared/config/navigation';
import {AppTabNavigation} from '@/shared/config/navigation';
import {HomePage} from '@/pages/home/main';
import {Theme} from '@/shared/config/theme';
import {Colors} from '@/shared/config/colors';
import * as Icons from '@/shared/assets/icons';

import {
    NAV_PADDING_BOTTOM,
    NAV_PADDING_TOP,
    NAV_HEIGHT,
    NAV_FONT_SIZE,
    CONTENT_PADDING_HORIZONTAL,
} from '@/shared/config/dimensions';
const Tab = createBottomTabNavigator<NavigationTabList>();

const screenOptions = {
    headerShown: false,
    tabBarStyle: {
        paddingTop: NAV_PADDING_TOP,
        paddingBottom: NAV_PADDING_BOTTOM,
        height: NAV_HEIGHT,
    },
    tabBarLabelStyle: {
        fontSize: NAV_FONT_SIZE,
        fontFamily: 'Inter_Regular',
        fontWeight: 400,
    },
    headerLeftContainerStyle: {
        paddingLeft: CONTENT_PADDING_HORIZONTAL - 5,
    },
    headerRightContainerStyle: {
        paddingRight: CONTENT_PADDING_HORIZONTAL - 5,
    },
    freezeOnBlur: true,
} as const;

export const BottomTabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={{...screenOptions}}>
            <Tab.Screen
                name={AppTabNavigation.FAVOURITE}
                component={HomePage}
                options={{
                    title: AppTabNavigation.FAVOURITE,
                    headerTransparent: true,
                    headerTitle: '',
                    tabBarIcon: ({focused}) =>
                        TabBarIcon({
                            color: focused
                                ? Colors.tabs.focus
                                : Colors.tabs.unfocus,
                            Icon: Icons.Favourite,
                        }),
                }}
            />
            <Tab.Screen
                name={AppTabNavigation.MAIN}
                component={HomePage}
                options={{
                    title: AppTabNavigation.MAIN,
                    headerTransparent: true,
                    headerTitle: '',
                    tabBarIcon: ({focused}) =>
                        TabBarIcon({
                            color: focused
                                ? Colors.tabs.focus
                                : Colors.tabs.unfocus,
                            Icon: Icons.Home,
                        }),
                }}
            />
            <Tab.Screen
                name={AppTabNavigation.BOOKING}
                component={HomePage}
                options={{
                    title: AppTabNavigation.BOOKING,
                    headerTransparent: true,
                    headerTitle: '',
                    tabBarIcon: ({focused}) =>
                        TabBarIcon({
                            color: focused
                                ? Colors.tabs.focus
                                : Colors.tabs.unfocus,
                            Icon: Icons.Booking,
                        }),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({});
