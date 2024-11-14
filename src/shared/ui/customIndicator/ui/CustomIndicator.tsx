import {ActivityIndicatorProps, ActivityIndicator} from 'react-native';
import React from 'react';
import {Colors} from '@/shared/config/colors';

type CustomIndicatorType = ActivityIndicatorProps;

export const CustomIndicator = (props: CustomIndicatorType) => {
    const {size = 'small', color = Colors.indicator, ...res} = props;
    return <ActivityIndicator size={size} color={color} {...res} />;
};
