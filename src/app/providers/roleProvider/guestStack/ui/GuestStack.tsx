import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationStackList} from '@/shared/config/navigation/types';
import {AuthScreen} from '@/pages/auth/signIn';
import {RegistrationScreen} from '@/pages/auth/signUp';
import {AppNavigation} from '@/shared/config/navigation/types';
const Stack = createNativeStackNavigator<NavigationStackList>();

export const GuestStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={AppNavigation.SIGN_IN}
            component={AuthScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name={AppNavigation.SIGN_UP}
            component={RegistrationScreen}
            options={{headerShown: false}}
        />
    </Stack.Navigator>
);
