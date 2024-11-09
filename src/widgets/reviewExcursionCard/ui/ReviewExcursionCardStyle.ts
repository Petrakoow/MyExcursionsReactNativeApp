import {StyleSheet} from 'react-native';
import {Colors} from '@/shared/config/colors';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    reviewTitle: {},
    reviewItem: {
        marginBottom: moderateScale(16),
        padding: moderateScale(8),
        paddingHorizontal: moderateScale(12),
        borderRadius: 8,
        backgroundColor: Colors.widget.reviewExcursionCard.backgroundColor,
        gap: moderateScale(6),
    },
    reviewDate: {
        color: '#888',
    },
    reviewRatingTitle: {
        color: Colors.widget.reviewExcursionCard.title,
    },
    reviewRating: {
        color: Colors.widget.reviewExcursionCard.rating,
    },
    reviewContent: {
        color: '#333',
    },
});
