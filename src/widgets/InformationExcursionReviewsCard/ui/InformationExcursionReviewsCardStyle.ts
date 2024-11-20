import { palette } from '@/shared/config/colors';
import {
    CONTENT_PADDING_VERTICAL,
    CONTENT_PADDING_HORIZONTAL,
    GAP_BASE,
} from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentHeader: {
        paddingTop: CONTENT_PADDING_VERTICAL,
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        marginBottom: moderateScale(12),
        gap: GAP_BASE - 1,
    },
    contentBottom: {
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
    },
    contentReview: {
        flex: 1,
    },
    title: {
        paddingVertical: moderateScale(5),
    },
    header: {
        color: palette.light.primary,
        marginBottom: moderateScale(3),
    },
    ratingTitle: {
        color: palette.light.primary,
        marginBottom: moderateScale(4),
    },
    rating: {
        color: palette.light.warning,
    },
    summary: {
        color: palette.light.primary,
    },
    noReviewsText: {
        textAlign: 'center',
        marginTop: moderateScale(16),
        color: palette.light.textSecondary,
    },
    pagination: {
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        paddingVertical: moderateScale(5),
    },
    reviewButton: {
        padding: moderateScale(3),
    },
    contentDatabaseReviews: {
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
    },
    userReview: {
        backgroundColor: palette.light.primary
    }
});
