import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from '@/provider';
import {DatabaseProvider} from '@/provider';
import {FilterProvider} from '@/provider';
import {AppNavigator} from './navigation';

const App = () => {
    return (
        <DatabaseProvider>
            <FilterProvider>
                <AuthProvider>
                    <NavigationContainer>
                        <AppNavigator />
                    </NavigationContainer>
                </AuthProvider>
            </FilterProvider>
        </DatabaseProvider>
    );
};

export default App;
