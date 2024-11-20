import { palette } from '../../colors';
import {FontFamily} from '../../font';
export const HeaderStackNavigationStyleOptions = (title: string) => {
    return {
        title,
        headerStyle: {
            backgroundColor: palette.light.primary,
        },
        headerTitleStyle: {
            fontFamily: FontFamily.INTER_REGULAR,
            fontSize: 18,
        },
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: palette.light.textPrimaryInv,
    } as const;
};
