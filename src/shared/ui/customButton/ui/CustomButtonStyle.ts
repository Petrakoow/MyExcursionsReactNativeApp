import {CONTENT_RADIUS} from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '@/shared/config/colors';
import {Theme} from '@/shared/config/theme';
export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: moderateScale(15),
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(15),
        borderRadius: CONTENT_RADIUS,
        maxHeight: 55,
    },
    disabled: {
        opacity: 0.7,
    },
});

export const styleButton = StyleSheet.create({
    firstTypeButton: Theme.light.buttonFirstType,
    secondTypeButton: {...Theme.light.buttonSecondType, borderWidth: 1},
});
