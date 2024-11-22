import {palette} from '@/shared/config/colors';
import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
    CONTENT_RADIUS,
    CONTENT_MARGIN_HORIZONTAL,
    GAP_BASE,
} from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerContainer: {
        position: 'relative',
    },
    iconContainer: {
        width: moderateScale(130),
        height: moderateScale(130),
        borderRadius: '50%',
        backgroundColor: palette.light.background,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: moderateScale(2),
        borderColor: palette.light.primary,
    },
    buttonIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        backgroundColor: palette.light.textPrimary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: palette.light.modalBackground,
    },
    modalContent: {
        backgroundColor: palette.light.background,
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL - 5,
        paddingVertical: CONTENT_PADDING_VERTICAL - 5,
        borderRadius: CONTENT_RADIUS - 15,
        marginHorizontal: CONTENT_MARGIN_HORIZONTAL,
        gap: GAP_BASE + 5,
    },
    modalButton: {
        paddingVertical: moderateScale(3),
    },
    modalSelectPhotoContainer: {
        flexDirection: 'row',
        gap: GAP_BASE,
    },
    flexRowButton: {
        flex: 1,
    },
    modalCancelButton: {
        marginTop: moderateScale(10),
    },
});
