import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
    moderateScale,
} from '@/shared/config/dimensions';
import { StyleSheet } from 'react-native';



export const styles = StyleSheet.create({
    screenContainer: {
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    flatList: {
        paddingTop: CONTENT_PADDING_VERTICAL,
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: moderateScale(10),
    },
    pageButton: {
        paddingVertical: moderateScale(5),
        paddingHorizontal: moderateScale(15),
        width: moderateScale(100),
    },
});
