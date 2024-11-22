import { palette } from "@/shared/config/colors";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: palette.light.background,
        borderRadius: moderateScale(12),
        overflow: 'hidden',
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: moderateScale(15),
    },
    title: {
        color: palette.light.textPrimaryInv,
    },
    icon: {
        marginRight: moderateScale(10),
    },
    dropdown: {
        padding: moderateScale(10),
        backgroundColor: palette.light.surface,
    },
});