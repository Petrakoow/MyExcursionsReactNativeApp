import {StyleSheet} from 'react-native';
import {CONTENT_RADIUS, moderateScale} from '@/shared/config/dimensions';
import {palette} from '@/shared/config/colors';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: moderateScale(5),
    },
    input: {
        borderWidth: 1,
        borderRadius: CONTENT_RADIUS,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(15),
    },
    paddingInput: {
        paddingRight: moderateScale(50),
    },
    wrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    borderColor: {
        borderColor: palette.light.border,
    },
});
