import {ActivityIndicatorProps, ActivityIndicator} from 'react-native';
import React from 'react';
import {palette} from '@/shared/config/colors';

type CustomIndicatorType = ActivityIndicatorProps;

export const CustomIndicator = (props: CustomIndicatorType) => {
    const {size = 'small', color = palette.light.primary, ...res} = props;
    return <ActivityIndicator size={size} color={color} {...res} />;
};
