import {StyleSheet} from 'react-native';
import {Theme} from '@/shared/config/theme';
import {moderateScale} from 'react-native-size-matters';

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
        ...Theme.light.indicator,
    },
});
