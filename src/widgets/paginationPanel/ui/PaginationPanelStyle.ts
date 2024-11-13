import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pageButton: {
        width: moderateScale(100),
        height: moderateScale(25),
    },
});
