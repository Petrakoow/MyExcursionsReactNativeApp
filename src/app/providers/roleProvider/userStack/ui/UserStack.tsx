import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationStackList} from '@/shared/config/navigation/types';
import {ExcursionInfoPageScreen} from '@/pages/tours';
import {AppNavigation} from '@/shared/config/navigation/types';
import {BottomTabNavigation} from '@/widgets/tabNavigation';
import {HeaderStackNavigationStyleOptions} from '@/shared/config/navigation';

import {getEnumTranslation} from '@/shared/config/navigation';
import {ExcursionFavoritesListPageScreen} from '@/pages/favorites/excursionList';

const Stack = createNativeStackNavigator<NavigationStackList>();

export const UserStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={AppNavigation.MAIN}
            component={BottomTabNavigation}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name={AppNavigation.EXCURSION_INFO}
            component={ExcursionInfoPageScreen}
            options={{
                ...HeaderStackNavigationStyleOptions(
                    getEnumTranslation(AppNavigation.EXCURSION_INFO),
                ),
            }}
        />
    </Stack.Navigator>
);
