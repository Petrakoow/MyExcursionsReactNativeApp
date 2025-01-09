import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from '@/provider';
import {DatabaseProvider} from '@/provider';
import {FilterProvider} from '@/provider';
import {AppNavigator} from './navigation';
import {TimeProvider} from '@/provider/timeProvider/ui/TimeProvider';

const App = () => {
    return (
        <DatabaseProvider>
            <TimeProvider>
                <FilterProvider>
                    <AuthProvider>
                        <NavigationContainer>
                            <AppNavigator />
                        </NavigationContainer>
                    </AuthProvider>
                </FilterProvider>
            </TimeProvider>
        </DatabaseProvider>
    );
};

export default App;
