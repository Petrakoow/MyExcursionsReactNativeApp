import {palette} from '@/shared/config/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    excursionCard: {
        flex: 1,
        aspectRatio: 1,
        backgroundColor: palette.light.surface,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        elevation: 3,
    },
    excursionText: {
        fontSize: 14,
        textAlign: 'center',
    },
});
