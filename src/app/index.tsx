import {NavigationContainer} from '@react-navigation/native';
import {RoleProvider} from '@/features/auth/role';
import {AppNavigator} from './navigation';
const App = () => {
    return (
        <RoleProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </RoleProvider>
    );
};

export default App;
