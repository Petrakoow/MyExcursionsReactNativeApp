import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pageButton: {
        paddingVertical: moderateScale(5),
        paddingHorizontal: moderateScale(15),
        width: moderateScale(100),
    },
});
