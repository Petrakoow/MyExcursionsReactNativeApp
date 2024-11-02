import {AuthScreen} from '@/pages/auth/signIn';
import RegistrationScreen from '@/pages/auth/signUp/ui/registrationScreen/SIgnUpScreen';
import { AppNavigation, NavigationStackList } from '@/shared/config/navigation/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<NavigationStackList>();

const App = () => {
    return (
        <NavigationContainer>
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
        </NavigationContainer>
    );
};

export default App;
