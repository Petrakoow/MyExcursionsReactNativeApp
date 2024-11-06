import {Text, View} from 'react-native';
import React from 'react';
import {useAuth} from '@/features/auth/role';
import {ScreenContent} from '@/shared/ui/screenContent';
export const HomePage = () => {
    console.log(useAuth());
    return (
        <ScreenContent>
            <View>
                <Text>HomePage</Text>
            </View>
        </ScreenContent>
    );
};
