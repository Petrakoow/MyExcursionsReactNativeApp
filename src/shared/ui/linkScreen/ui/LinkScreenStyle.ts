import {Theme} from '@/shared/config/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
    },
    link: {
        alignSelf: 'flex-start',
    },
    linkText: {
        ...Theme.light.link,
    },
});
