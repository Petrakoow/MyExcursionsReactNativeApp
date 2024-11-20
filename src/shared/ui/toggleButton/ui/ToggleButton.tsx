import {GestureResponderEvent, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomText} from '../../customText';
import {styles} from './ToggleButtonStyle';
import {Colors} from '@/shared/config/colors';
import {ToggleButtonType} from '../type/toggleButtonType';
import {moderateScale} from 'react-native-size-matters';

const ICON_SIZE = moderateScale(20);

export const ToggleButton = (props: ToggleButtonType) => {
    const {
        title,
        isActive = false,
        activeColor = Colors.toggleButton.active,
        inactiveColor = Colors.toggleButton.inActive,
        textActiveColor = Colors.toggleButton.textActive,
        textInActiveColor = Colors.toggleButton.textInActive,
        Icon,
        style,
        onPress,
        ...res
    } = props;

    const [internalIsActive, setInternalIsActive] = useState(isActive);

    useEffect(() => {
        setInternalIsActive(isActive);
    }, [isActive]);

    const handlePress = (event: GestureResponderEvent) => {
        setInternalIsActive(!internalIsActive);
        if (onPress) onPress(event);
    };

    return (
        <TouchableOpacity
            {...res}
            onPress={handlePress}
            style={[
                styles.container,
                style,
                {
                    backgroundColor: internalIsActive
                        ? activeColor
                        : inactiveColor,
                },
            ]}>
            {title && (
                <CustomText
                    style={[
                        styles.content,
                        {
                            color: internalIsActive
                                ? textActiveColor
                                : textInActiveColor,
                        },
                    ]}>
                    {title}
                </CustomText>
            )}
            {Icon && (
                <Icon
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    fill={internalIsActive ? activeColor : inactiveColor}
                />
            )}
        </TouchableOpacity>
    );
};
