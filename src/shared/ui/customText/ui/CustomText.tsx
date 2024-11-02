
import { Text } from "react-native";
import { TextSize, TextWeight, styles, CustomTextType } from "@/shared/config/font";

export const CustomText = (props: CustomTextType) => {
    const {
        children,
        size = TextSize.S_BASE,
        weight = TextWeight.NORMAL,
        style,
        ...res
    } = props;

    return (
        <Text
            style={[
                styles.font_normal,
                styles[size],
                styles[weight],
                style,
            ]}
            {...res}
        >
            {children}
        </Text>
    );
};
