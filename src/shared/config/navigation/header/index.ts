import {Colors} from '../../colors';
import {FontFamily} from '../../font';
import {TouchableOpacity} from 'react-native';
export const HeaderStackNavigationStyleOptions = (title: string) => {
    return {
        headerStyle: {
            backgroundColor: Colors.headerStack.backgroundColor,
        },
        headerTitleStyle: {
            fontFamily: FontFamily.INTER_LIGHT,
            color: Colors.white,
            fontSize: 18,
        },
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: Colors.white,
    } as const;
};
