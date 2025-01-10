import {
    CONTENT_MARGIN_VERTICAL,
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
} from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    filterContent: {
        paddingTop: CONTENT_MARGIN_VERTICAL,
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        marginBottom: moderateScale(12),
    },
    flatlistContent: {
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        paddingBottom: CONTENT_PADDING_VERTICAL,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subCategoryContainer: {
        marginBottom: moderateScale(16),
    },
    subCategoryTitle: {
        marginBottom: moderateScale(16),
    },
    gridRow: {
        justifyContent: 'space-between',
        marginBottom: 12,
        gap: moderateScale(16),
    },
});
