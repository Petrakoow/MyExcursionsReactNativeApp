import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
    GAP_BASE,
} from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    content: {
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        paddingVertical: CONTENT_PADDING_VERTICAL,
        gap: GAP_BASE,
    },
    buttonPadding: {
        padding: moderateScale(4),
    },
});
