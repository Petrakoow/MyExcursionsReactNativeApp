import {TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomText} from '../../customText';
import {styles} from './ToggleButtonStyle';
import {Colors} from '@/shared/config/colors';
import {ToggleButtonType} from '../type/toggleButtonType';

export const ToggleButton = (props: ToggleButtonType) => {
    const {
        title,
        isActive = false, 
        activeColor = Colors.toggleButton.active,
        inactiveColor = Colors.toggleButton.inActive,
        textActiveColor = Colors.toggleButton.textActive,
        textInActiveColor = Colors.toggleButton.textInActive,
        style,
        callback,
        ...res
    } = props;

    const [internalIsActive, setInternalIsActive] = useState(isActive);

    useEffect(() => {
        setInternalIsActive(isActive);
    }, [isActive]);

    const handlePress = () => {
        setInternalIsActive(!internalIsActive);

        if (callback) callback();
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
        </TouchableOpacity>
    );
};