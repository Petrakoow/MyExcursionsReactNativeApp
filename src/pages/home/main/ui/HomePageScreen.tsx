import {Text, View} from 'react-native';
import React from 'react';
import { useAuth } from '@/features/auth/role';
export const HomePage = () => {
    console.log(useAuth());
    return (
        <View>
            <Text>HomePage</Text>
        </View>
    );
};
