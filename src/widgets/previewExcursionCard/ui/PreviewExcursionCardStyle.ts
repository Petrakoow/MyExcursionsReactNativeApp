import {moderateScale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';
import {palette} from '@/shared/config/colors';
export const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        marginBottom: moderateScale(15),
        backgroundColor: '#fff',
        borderRadius: moderateScale(12),
        overflow: 'hidden',
        shadowOpacity: 0.6,
        shadowColor: '#333',
        height: 200,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        marginBottom: moderateScale(12),
        color: palette.light.primary,
    },
    shortInfo: {
        marginBottom: moderateScale(12),
    },
    image: {
        width: 100,
        height: 'auto',
    },
    infoContainer: {
        flex: 1,
        padding: 10,
    },
    duration: {
        marginBottom: moderateScale(4),
        color: palette.light.primary,
    },
    price: {
        marginBottom: moderateScale(5),
        color: palette.light.primary,
    },
    ratingContainer: {
        marginBottom: moderateScale(10),
    },
    rating: {
        marginBottom: moderateScale(14),
        color: palette.light.warning,
    },
});
