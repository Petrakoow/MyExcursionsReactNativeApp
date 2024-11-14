import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
    moderateScale,
} from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    content: {
        paddingTop: CONTENT_PADDING_VERTICAL,
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        flex: 1,
        gap: moderateScale(5),
    },
    pagination: {
        flex: 0,
        paddingTop: moderateScale(5),
        paddingBottom: moderateScale(5),
    },
});
