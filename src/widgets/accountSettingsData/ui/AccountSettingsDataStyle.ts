import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: moderateScale(12),
    },
    button: {
        paddingVertical: moderateScale(5),
    },
});
