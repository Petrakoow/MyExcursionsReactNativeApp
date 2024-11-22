import {palette} from '@/shared/config/colors';
import {CONTENT_RADIUS} from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: moderateScale(15),
        borderRadius: CONTENT_RADIUS,
    },
    disabled: {
        opacity: 0.7,
    },
    content: {
        textAlign: 'center',
        paddingHorizontal: moderateScale(10),
    },
});

export const styleButton = StyleSheet.create({
    primaryTypeButton: {
        backgroundColor: palette.light.primary,
        color: palette.light.textPrimaryInv,
    },
    secondaryTypeButton: {
        borderWidth: 1,
        backgroundColor: palette.light.background,
    },
    warningTypeButton: {
        backgroundColor: palette.light.error,
        color: palette.light.textPrimaryInv,
    },
});
