import {Colors} from '../../colors';
import {FontFamily} from '../../font';
export const HeaderStackNavigationStyleOptions = (title: string) => {
    return {
        title,
        headerStyle: {
            backgroundColor: Colors.headerStack.backgroundColor,
        },
        headerTitleStyle: {
            fontFamily: FontFamily.INTER_REGULAR,
            color: Colors.white,
            fontSize: 18,
        },
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: Colors.white,
    } as const;
};
