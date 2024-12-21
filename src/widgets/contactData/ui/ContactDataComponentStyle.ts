import {palette} from '@/shared/config/colors';
import {GAP_BASE} from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        gap: GAP_BASE + 5,
    },
    textInformation: {
        color: palette.light.error,
    },
    input: {
        paddingVertical: moderateScale(5),
    },
    inputEnd: {
        marginBottom: moderateScale(10),
    },
    button: {
        paddingVertical: moderateScale(5),
    },
});
