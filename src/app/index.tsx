import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RoleProvider} from '@/features/auth/role';
import {DatabaseProvider} from '@/features/db/provider';
import {AppNavigator} from './navigation';
import {MapNavigationProvider} from '@/features/map';
import {FilterProvider} from '@/features/filters';

// TODO: вынести providers в отдельный слой директории

const App = () => {
    return (
        <DatabaseProvider>
            <RoleProvider>
                <NavigationContainer>
                    <MapNavigationProvider>
                        <FilterProvider>
                            <AppNavigator />
                        </FilterProvider>
                    </MapNavigationProvider>
                </NavigationContainer>
            </RoleProvider>
        </DatabaseProvider>
    );
};

export default App;
