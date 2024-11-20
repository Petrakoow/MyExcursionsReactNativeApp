import { palette } from '@/shared/config/colors';
import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
    CONTENT_RADIUS,
    MODAL_WIDTH,
} from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: palette.light.modalBackground,
    },
    modalContainer: {
        width: MODAL_WIDTH,
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL - 5,
        paddingVertical: CONTENT_PADDING_VERTICAL - 10,
        backgroundColor: palette.light.background,
        borderRadius: CONTENT_RADIUS - 15,
        gap: moderateScale(10),
        alignItems: 'center',
    },
    toggleContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: moderateScale(6),
    },
    toggleButton: {
        padding: moderateScale(10),
        borderRadius: '50%',
    },
    titleWindow: {
        color: palette.light.primary,
    },
    filterSearchContainer: {
        gap: moderateScale(12),
        marginBottom: moderateScale(5),
        width: '100%',
    },
    buttonPadding: {
        padding: moderateScale(4),
    },
});
