import {
    View,
    ActivityIndicator,
    ColorValue,
    ActivityIndicatorProps,
} from 'react-native';
import React from 'react';
import {styles} from './SplashScreenStyle';
import {Colors} from '@/shared/config/colors';
import {CustomText} from '../../customText';
import {TextSize, TextWeight} from '@/shared/config/font';
import {Logotype} from '../../customLogo';
import {CustomIndicator} from '../../customIndicator';

type SplashScreenType = {
    titleIndicator?: string;
    titleLogotype?: string;
    showLogotype?: boolean;
    color?: ColorValue;
    size?: number | "large" | "small" | undefined;
};

export const SplashScreen = (props: SplashScreenType) => {
    const {
        titleIndicator = 'Hello!',
        titleLogotype = 'TourismApp',
        showLogotype = true,
        color = Colors.indicator,
        size = 'large',
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
                    size={TextSize.S_2XL}
                    weight={TextWeight.BOLD}
                    style={styles.colorTitle}>
                    {titleIndicator}
                </CustomText>
                <CustomIndicator size={size} color={color} />
            </View>
        </View>
    );
};
