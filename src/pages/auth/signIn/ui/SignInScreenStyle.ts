import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
} from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    content: {
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        paddingVertical: CONTENT_PADDING_VERTICAL,
        justifyContent: 'space-between',
        flex: 1,
    },
    logoContainer: {
        marginBottom: moderateScale(36),
    },
    inputContainer: {
        marginBottom: moderateScale(12),
    },
    separatorContainer: {
        marginBottom: moderateScale(24),
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
    continueContainer: {
        marginBottom: moderateScale(16),
    },
    continueAsGuestContainer: {
        marginBottom: moderateScale(82),
    },
    heightButton: {
        minHeight: moderateScale(45),
    },
});
