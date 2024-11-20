import {palette} from '@/shared/config/colors';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: moderateScale(20),
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(20),
    },
    colorTitle: {
        color: palette.light.primary,
        padding: moderateScale(20),
        textAlign: 'center',
    },
});
