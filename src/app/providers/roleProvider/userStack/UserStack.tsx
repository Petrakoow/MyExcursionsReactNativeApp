import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationStackList} from '@/shared/config/navigation/navigation';
import {HomePage} from '@/pages/home/main';
import {AppNavigation} from '@/shared/config/navigation/navigation';
const Stack = createNativeStackNavigator<NavigationStackList>();

export const UserStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={AppNavigation.MAIN}
            component={HomePage}
            options={{headerShown: false}}
        />
    </Stack.Navigator>
);
