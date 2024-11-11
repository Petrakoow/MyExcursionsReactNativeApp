import {NavigationContainer} from '@react-navigation/native';
import {RoleProvider} from '@/features/auth/role';
import {AppNavigator} from './navigation';
import {DatabaseProvider} from './providers';

const App = () => {
    return (
        <DatabaseProvider>
            <RoleProvider>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </RoleProvider>
        </DatabaseProvider>
    );
};

export default App;
