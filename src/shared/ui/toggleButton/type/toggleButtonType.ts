import { ColorValue, TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";

export type ToggleButtonType = TouchableOpacityProps & {
    title?: string;
    isActive?: boolean; 
    activeColor?: string;
    inactiveColor?: string;
    textActiveColor?: ColorValue;
    textInActiveColor?: ColorValue;
    callback?: () => void;
    Icon?: React.FC<SvgProps>;
};