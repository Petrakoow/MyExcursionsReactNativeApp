import {
    TouchableOpacity,
    TouchableOpacityProps,
    ColorValue,
} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {CustomText} from '@/shared/ui/customText';
import {SvgProps} from 'react-native-svg';
import {styles} from './CustomButtonStyle';
import {TextSize} from '@/shared/config/font';
import { palette } from '@/shared/config/colors';

type CustomButtonProps = TouchableOpacityProps & {
    Icon?: React.FC<SvgProps>;
    textButton?: string | number;
    textColor?: ColorValue;
    textSize?: TextSize;
    iconSize?: number;
};

const ICON_SIZE = moderateScale(25);

export const CustomButton = (props: CustomButtonProps) => {
    const {
        Icon,
        textButton,
        textColor = palette.light.textPrimaryInv,
        textSize = TextSize.S_XL,
        disabled,
        style,
        iconSize = ICON_SIZE,
        ...res
    } = props;
    return (
        <TouchableOpacity
            style={[styles.container, style, disabled && styles.disabled]}
            disabled={disabled}
            {...res}>
            {textButton && (
                <CustomText size={textSize} style={[{color: textColor}, styles.content]}>
                    {textButton}
                </CustomText>
            )}
            {Icon && (
                <Icon width={iconSize} height={iconSize} fill={textColor} />
            )}
        </TouchableOpacity>
    );
};
