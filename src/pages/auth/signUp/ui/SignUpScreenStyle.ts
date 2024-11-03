import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        gap: 20,
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
