import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {palette} from '@/shared/config/colors';
import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
    CONTENT_RADIUS,
} from '@/shared/config/dimensions';

export const styles = StyleSheet.create({
    content: {
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        paddingVertical: CONTENT_PADDING_VERTICAL,
    },
    noBookings: {
        padding: moderateScale(20),
        backgroundColor: palette.light.primary,
        borderRadius: CONTENT_RADIUS - moderateScale(15),
        color: palette.light.textPrimaryInv,
    },
    card: {
        backgroundColor: palette.light.overlay,
        borderRadius: moderateScale(12),
        overflow: 'hidden',
        marginBottom: moderateScale(16),
    },
    date: {
        color: palette.light.error,
    },
    countdown: {
        color: palette.light.error,
    },
    activityType: {
        color: palette.light.primary,
    },
    paymentType: {
        color: palette.light.primary,
    },
    button: {
        backgroundColor: palette.light.overlay,
        borderRadius: 0,
        paddingBottom: moderateScale(10),
    },
    notVerifiedText: {
        padding: moderateScale(20),
        backgroundColor: palette.light.error,
        borderRadius: CONTENT_RADIUS - moderateScale(15),
        color: palette.light.textPrimaryInv,
    },
});
