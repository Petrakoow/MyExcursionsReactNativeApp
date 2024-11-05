import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationStackList} from '@/shared/config/navigation';
import {HomePage} from '@/pages/home/main';
import {AppNavigation} from '@/shared/config/navigation';
import { BottomTabNavigation } from '@/widgets/tabNavigation';
const Stack = createNativeStackNavigator<NavigationStackList>();

export const UserStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={AppNavigation.MAIN}
            component={BottomTabNavigation}
            options={{headerShown: false}}
        />
    </Stack.Navigator>
);
