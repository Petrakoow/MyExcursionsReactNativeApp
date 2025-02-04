import {palette} from '@/shared/config/colors';
import {CONTENT_RADIUS} from '@/shared/config/dimensions';
import {TextSize, styles} from '@/shared/config/font';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const SIZE_SEARCH_FILTER_BUTTONS = moderateScale(25);

export const stylesFilterPanel = StyleSheet.create({
    contentFilter: {
        maxHeight: moderateScale(100),
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: CONTENT_RADIUS - 20,
        borderColor: palette.light.border,
    },
    contentFilterList: {
        gap: moderateScale(3),
    },
});

export const stylesSearchFilter = StyleSheet.create({
    titleSearchFilter: {
        marginBottom: moderateScale(5),
    },
    containerSearchFilter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: moderateScale(10),
        height: moderateScale(25),
        marginBottom: moderateScale(5),
    },
    inputSearchFilter: {
        paddingVertical: 3,
        paddingHorizontal: moderateScale(12),
        ...styles[TextSize.S_BASE],
    },
    buttonSearchFilter: {
        minWidth: SIZE_SEARCH_FILTER_BUTTONS,
    },
    containerSelectedItem: {
        paddingBottom: moderateScale(10),
    },
    selectedItem: {
        color: palette.light.primary,
    },
});
