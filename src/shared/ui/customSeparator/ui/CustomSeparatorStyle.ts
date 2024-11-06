import {StyleSheet} from 'react-native';
import { Colors } from '@/shared/config/colors';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.separator,
    },
    text: {
        marginHorizontal: 10,
        position: 'relative',
        top: -2.5,
    },
});
