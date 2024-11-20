import {palette} from '@/shared/config/colors';
import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
    CONTENT_RADIUS,
    MODAL_HEIGHT,
    MODAL_WIDTH,
} from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: palette.light.modalBackground,
    },
    modalContent: {
        margin: CONTENT_PADDING_HORIZONTAL,
        borderRadius: 15,
        maxHeight: MODAL_HEIGHT,
        backgroundColor: palette.light.background,
    },
    closeContent: {
        paddingVertical: moderateScale(10),
        margin: 0,
        borderTopLeftRadius: CONTENT_RADIUS - 15,
        borderTopRightRadius: CONTENT_RADIUS - 15,
    },
    contentScroll: {
        paddingTop: 0,
        borderBottomLeftRadius: CONTENT_RADIUS - 15,
        borderBottomRightRadius: CONTENT_RADIUS - 15,
    },
    closeButton: {
        alignSelf: 'flex-end',
        paddingVertical: moderateScale(4),
        marginBottom: moderateScale(4),
    },
    optionContainer: {
        marginBottom: moderateScale(4),
        borderBottomWidth: 1,
        padding: moderateScale(10),
        paddingBlockEnd: moderateScale(20),
        borderColor: palette.light.primary,
    },
    optionTitle: {
        marginBottom: moderateScale(5),
    },
    orderLine: {
        marginTop: moderateScale(10),
    },
    markTitle: {
        color: palette.light.primary,
    },
    markHeaderTitle: {
        color: palette.light.overlay,
    },
    marginText: {
        marginBottom: moderateScale(15),
    },
    buttonBooking: {
        paddingVertical: moderateScale(5),
    },
    content: {
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        paddingVertical: CONTENT_PADDING_VERTICAL,
        backgroundColor: palette.light.background,
    },
});
