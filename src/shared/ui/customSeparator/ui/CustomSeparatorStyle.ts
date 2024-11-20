import {StyleSheet} from 'react-native';
import { palette } from '@/shared/config/colors';
import { moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: palette.light.border,
    },
    text: {
        marginHorizontal: moderateScale(10),
        position: 'relative',
        top: -2.5,
    },
});
