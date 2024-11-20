import {CONTENT_RADIUS} from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '@/shared/config/colors';
export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: moderateScale(15),
        borderRadius: CONTENT_RADIUS,
    },
    disabled: {
        opacity: 0.7,
    },
    content: {
        paddingHorizontal: moderateScale(10),
    },
});

export const styleButton = StyleSheet.create({
    firstTypeButton: {
        backgroundColor: Colors.button,
        color: Colors.white,
    },
    secondTypeButton: {
        borderWidth: 1,
        backgroundColor: Colors.white,
    },
    heightForm: {
        minHeight: moderateScale(45),
    },
});
