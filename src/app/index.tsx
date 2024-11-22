import {NavigationContainer} from '@react-navigation/native';
import {RoleProvider} from '@/features/auth/role';
import {DatabaseProvider} from '@/features/db/provider';
import {AppNavigator} from './navigation';
import {MapNavigationProvider} from '@/features/map';

const App = () => {
    return (
        <DatabaseProvider>
            <RoleProvider>
                <NavigationContainer>
                    <MapNavigationProvider>
                        <AppNavigator />
                    </MapNavigationProvider>
                </NavigationContainer>
            </RoleProvider>
        </DatabaseProvider>
    );
};

export default App;
