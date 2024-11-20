import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        gap: moderateScale(20),
    },
    inputContainer: {
        gap: moderateScale(12),
    },
    informationContainer: {
        gap: moderateScale(10),
    },
    heightButton: {
        minHeight: moderateScale(45),
    },
});
