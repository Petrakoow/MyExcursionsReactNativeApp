import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    inputContainer: {
        gap: moderateScale(12),
        marginBottom: moderateScale(32),
    },
    continueContainer: {
        marginBottom: moderateScale(16),
    },
});
