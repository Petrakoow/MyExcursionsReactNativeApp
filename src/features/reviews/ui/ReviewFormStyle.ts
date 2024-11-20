import { palette } from "@/shared/config/colors";
import { CONTENT_RADIUS } from "@/shared/config/dimensions";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
    input: {
        paddingVertical: 3,
        paddingHorizontal: moderateScale(12),
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        borderRadius: CONTENT_RADIUS - 20,
    },
    errorText: {
        color: palette.light.warning,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(10),
    },
})