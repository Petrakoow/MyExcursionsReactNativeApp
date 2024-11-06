import {ReactNode} from 'react';
import {StyleSheet, TextProps} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export type CustomTextType = TextProps & {
    children: ReactNode;
    size?: TextSize;
    weight?: TextWeight;
};

export enum FontFamily {
    INTER_BLACK = 'Inter_Black',
    INTER_BOLD = 'Inter_Bold',
    INTER_EXTRABOLD = 'Inter_ExtraBold',
    INTER_EXTRALIGHT = 'Inter_ExtraLight',
    INTER_LIGHT = 'Inter_Light',
    INTER_MEDIUM = 'Inter_Medium',
    INTER_REGULAR = 'Inter_Regular',
    INTER_SEMIBOLD = 'Inter_SemiBold',
    INTER_THIN = 'Inter_Thin',
}

export enum TextSize {
    S_XS = 'size_xs',
    S_SM = 'size_sm',
    S_BASE = 'size_base',
    S_LG = 'size_lg',
    S_XL = 'size_xl',
    S_2XL = 'size_2xl',
    S_3XL = 'size_3xl',
    S_4XL = 'size_4xl',
    S_5XL = 'size_5xl',
    S_6XL = 'size_6xl',
    S_7XL = 'size_7xl',
    S_8XL = 'size_8xl',
    S_9XL = 'size_9xl',
}

export enum TextWeight {
    THIN = 'font_thin',
    EXTRA_LIGHT = 'font_extralight',
    LIGHT = 'font_light',
    NORMAL = 'font_normal',
    MEDIUM = 'font_medium',
    SEMIBOLD = 'font_semibold',
    BOLD = 'font_bold',
    EXTRA_BOLD = 'font_extrabold',
    BLACK = 'font_black',
}

export const styles = StyleSheet.create({
    size_xs: {
        fontSize: moderateScale(9),
    },
    size_sm: {
        fontSize: moderateScale(10.5),
    },
    size_base: {
        fontSize: moderateScale(12),
    },
    size_lg: {
        fontSize: moderateScale(13.5),
    },
    size_xl: {
        fontSize: moderateScale(15),
    },
    size_2xl: {
        fontSize: moderateScale(18),
    },
    size_3xl: {
        fontSize: moderateScale(22.5),
    },
    size_4xl: {
        fontSize: moderateScale(27),
    },
    size_5xl: {
        fontSize: moderateScale(36),
    },
    size_6xl: {
        fontSize: moderateScale(45),
    },
    size_7xl: {
        fontSize: moderateScale(54),
    },
    size_8xl: {
        fontSize: moderateScale(72),
    },
    size_9xl: {
        fontSize: moderateScale(96),
    },
    font_thin: {
        fontWeight: '100',
        fontFamily: 'Inter_Thin',
    },
    font_extralight: {
        fontWeight: '200',
        fontFamily: 'Inter_ExtraLight',
    },
    font_light: {
        fontWeight: '300',
        fontFamily: 'Inter_Light',
    },
    font_normal: {
        fontWeight: '400',
        fontFamily: 'Inter_Regular',
    },
    font_medium: {
        fontWeight: '500',
        fontFamily: 'Inter_Medium',
    },
    font_semibold: {
        fontWeight: '600',
        fontFamily: 'Inter_SemiBold',
    },
    font_bold: {
        fontWeight: '700',
        fontFamily: 'Inter_Bold',
    },
    font_extrabold: {
        fontWeight: '800',
        fontFamily: 'Inter_ExtraBold',
    },
    font_black: {
        fontWeight: '900',
        fontFamily: 'Inter_18pt-Black',
    },
});
