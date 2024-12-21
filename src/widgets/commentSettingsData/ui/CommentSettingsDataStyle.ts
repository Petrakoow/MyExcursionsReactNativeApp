import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        marginBottom: moderateScale(10),
    },
    card: {
        width: 330,
    },
    button: {
        paddingVertical: moderateScale(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainDeleteButton: {
        marginBottom: moderateScale(10),
    },
    titleText: {
        marginBottom: moderateScale(10),
    },
});
