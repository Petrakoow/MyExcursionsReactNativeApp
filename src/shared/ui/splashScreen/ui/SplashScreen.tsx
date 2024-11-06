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

type SplashScreenType = ActivityIndicatorProps & {
    titleIndicator?: string;
    titleLogotype?: string;
    showLogotype?: boolean;
};

export const SplashScreen = (props: SplashScreenType) => {
    const {
        titleIndicator = 'Hello!',
        titleLogotype = 'TourismApp',
        color = Colors.indicator,
        showLogotype = true,
        size = 'large',
        ...res
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
                <ActivityIndicator size={size} color={color} {...res} />
            </View>
        </View>
    );
};
