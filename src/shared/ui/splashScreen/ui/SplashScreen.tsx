import {View, ColorValue} from 'react-native';
import React from 'react';
import {styles} from './SplashScreenStyle';
import {CustomText} from '../../customText';
import {TextSize, TextWeight} from '@/shared/config/font';
import {Logotype} from '../../customLogo';
import {CustomIndicator} from '../../customIndicator';
import {palette} from '@/shared/config/colors';

type SplashScreenType = {
    titleIndicator?: string;
    titleLogotype?: string;
    showLogotype?: boolean;
    color?: ColorValue;
    size?: number | 'large' | 'small' | undefined;
    textSize?: TextSize;
};

export const SplashScreen = (props: SplashScreenType) => {
    const {
        titleIndicator = 'Hello!',
        titleLogotype = 'TourismApp',
        showLogotype = true,
        color = palette.light.primary,
        size = 'large',
        textSize = TextSize.S_2XL,
    } = props;
    return (
        <View style={styles.container}>
            {showLogotype && (
                <View>
                    <Logotype title={titleLogotype} />
                </View>
            )}
            <View style={styles.content}>
                <CustomText
                    size={textSize}
                    weight={TextWeight.BOLD}
                    style={styles.colorTitle}>
                    {titleIndicator}
                </CustomText>
                <CustomIndicator size={size} color={color} />
            </View>
        </View>
    );
};
