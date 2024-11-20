import { palette } from "@/shared/config/colors";
import { CONTENT_PADDING_HORIZONTAL } from "@/shared/config/dimensions";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
    bottomPanel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: palette.light.primary,
        padding: moderateScale(10),
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        borderTopRightRadius: moderateScale(10),
        borderTopLeftRadius: moderateScale(10),
        overflow: 'hidden',
        flexWrap: 'wrap',
    },
    bottomPanelButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});