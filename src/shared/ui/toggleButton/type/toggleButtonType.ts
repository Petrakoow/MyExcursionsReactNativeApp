import { ColorValue, TouchableOpacityProps } from "react-native";

export type ToggleButtonType = TouchableOpacityProps & {
    title?: string;
    isActive?: boolean; 
    activeColor?: string;
    inactiveColor?: string;
    textActiveColor?: ColorValue;
    textInActiveColor?: ColorValue;
    callback?: () => void;
};