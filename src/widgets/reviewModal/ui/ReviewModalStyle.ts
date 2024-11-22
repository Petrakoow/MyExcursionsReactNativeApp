import {palette} from '@/shared/config/colors';
import {
    MODAL_WIDTH,
    GAP_BASE,
    CONTENT_RADIUS,
    CONTENT_MARGIN_HORIZONTAL,
} from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    overlay: {
        height: '100%',
        backgroundColor: palette.light.modalBackground,
        justifyContent: 'center',
    },
    container: {
        marginHorizontal: CONTENT_MARGIN_HORIZONTAL,
        padding: moderateScale(20),
        backgroundColor: palette.light.background,
        borderRadius: CONTENT_RADIUS - 15,
        gap: GAP_BASE,
    },
    title: {
        marginBottom: moderateScale(10),
    },
});
