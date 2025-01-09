import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
    title: {
        marginBottom: moderateScale(10),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: moderateScale(6),
    },
    buttonWarning: {
        paddingVertical: moderateScale(4),
        marginTop: moderateScale(6),
    },
});