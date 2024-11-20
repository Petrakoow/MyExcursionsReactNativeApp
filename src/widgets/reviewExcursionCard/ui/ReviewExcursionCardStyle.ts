import { palette } from '@/shared/config/colors';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    reviewTitle: {},
    reviewItem: {
        marginBottom: moderateScale(16),
        padding: moderateScale(8),
        paddingHorizontal: moderateScale(12),
        borderRadius: 8,
        backgroundColor: palette.light.surface,
        gap: moderateScale(6),
    },
    reviewDate: {
        color: palette.light.textSecondary,
    },
    reviewRatingTitle: {
        color: palette.light.primary,
    },
    reviewRating: {
        color: palette.light.warning,
    },
    reviewContent: {
        color: '#333',
    },
});
