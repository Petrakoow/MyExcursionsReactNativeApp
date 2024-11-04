import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'space-between',
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
});
