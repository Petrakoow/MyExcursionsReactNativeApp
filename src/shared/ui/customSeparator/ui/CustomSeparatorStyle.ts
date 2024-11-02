import {StyleSheet} from 'react-native';
import {Theme} from '@/shared/config/theme';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    line: {
        flex: 1,
        height: 1,
        ...Theme.light.separator,
    },
    text: {
        marginHorizontal: 10,
        position: 'relative',
        top: -2.5,
    },
});
