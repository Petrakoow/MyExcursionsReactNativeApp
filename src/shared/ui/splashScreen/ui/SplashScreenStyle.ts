import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '@/shared/config/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    colorTitle: {
        color: Colors.indicator,
        padding: moderateScale(20),
        textAlign: 'center',
    },
});
