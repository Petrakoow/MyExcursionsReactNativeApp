import { CONTENT_PADDING_HORIZONTAL, CONTENT_PADDING_VERTICAL } from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    content: {
        gap: 20,
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        paddingVertical: CONTENT_PADDING_VERTICAL,
        justifyContent: 'space-between',
        flex: 1,
    },
    inputContainer: {
        gap: moderateScale(12),
    },
    accountContainer: {
        flexDirection: 'row',
        gap: moderateScale(10),
        alignSelf: 'center',
        justifyContent: 'flex-end',
    },
    textAccount: {
        alignSelf: 'flex-start',
    },
    informationContainer: {
        gap: moderateScale(10),
    },
});
