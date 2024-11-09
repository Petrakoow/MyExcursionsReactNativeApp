import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
    moderateScale,
} from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    content: {
        paddingVertical: CONTENT_PADDING_VERTICAL,
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
    },
    pagination: {
        paddingVertical: moderateScale(5),
    },
});
