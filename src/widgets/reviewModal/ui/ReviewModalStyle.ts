import { palette } from "@/shared/config/colors";
import { MODAL_WIDTH, GAP_BASE, CONTENT_RADIUS } from "@/shared/config/dimensions";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: palette.light.modalBackground,
    },
    container: {
        width: MODAL_WIDTH,
        padding: moderateScale(20),
        backgroundColor: palette.light.background,
        borderRadius: moderateScale(10),
        gap: GAP_BASE,
    },
    title: {
        marginBottom: moderateScale(10),
    },
});