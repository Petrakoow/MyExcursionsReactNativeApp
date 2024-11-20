import {Colors} from '@/shared/config/colors';
import {CONTENT_RADIUS} from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#888',
        borderRadius: CONTENT_RADIUS,
    },
    content: {
        textAlign: 'center',
    },
});