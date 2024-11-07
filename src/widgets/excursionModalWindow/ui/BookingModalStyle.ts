import {Colors} from '@/shared/config/colors';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        margin: moderateScale(10),
        paddingHorizontal: moderateScale(15),
        paddingVertical: moderateScale(10),
        backgroundColor: '#fff',
        borderRadius: moderateScale(10),
        maxHeight: '90%',
    },
    closeButton: {
        alignSelf: 'flex-end',
        paddingVertical: moderateScale(5),
        marginBottom: moderateScale(10),
    },
    optionContainer: {
        marginBottom: moderateScale(4),
        borderBottomWidth: 1,
        padding: 10,
        paddingBlockEnd: 20,
        borderColor: Colors.widget.modalExcursionWindow.markTitle,
    },
    optionTitle: {
        marginBottom: moderateScale(5),
    },
    orderLine: {
        marginTop: moderateScale(10),
    },
    markTitle: {
        color: Colors.widget.modalExcursionWindow.markTitle,
    },
    markHeaderTitle: {
        color: Colors.widget.modalExcursionWindow.markHeaderTitle,
    },
    marginText: {
        marginBottom: moderateScale(15),
    },
    buttonBooking: {
        paddingVertical: moderateScale(5),
    },
});
