import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
    CONTENT_RADIUS,
} from '@/shared/config/dimensions';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '@/shared/config/colors';

export const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL - 5,
        paddingVertical: CONTENT_PADDING_VERTICAL - 10,
        backgroundColor: 'white',
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
        padding: 10,
        borderRadius: '50%',
    },
    titleWindow: {
        color: Colors.widget.filterExcursionPanel.title,
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
