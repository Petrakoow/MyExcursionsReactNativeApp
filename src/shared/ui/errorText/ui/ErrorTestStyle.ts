import {StyleSheet} from 'react-native';
import {Theme} from '@/shared/config/theme';
export const styles = StyleSheet.create({
    container: {},
    titleError: {
        ...Theme.light.error,
    },
    descriptionError: {
        ...Theme.light.errorDescription,
    },
});
