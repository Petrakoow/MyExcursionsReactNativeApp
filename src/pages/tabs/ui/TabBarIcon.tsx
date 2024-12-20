import React, {FC} from 'react';
import {SvgProps} from 'react-native-svg';
import {moderateScale} from 'react-native-size-matters';
import {ColorValue} from 'react-native';

type TabBarIconProps = {
    colorFocus: ColorValue;
    colorUnfocus: ColorValue;
    Icon: FC<SvgProps>;
    focused: boolean;
};

const ICON_SIZE = moderateScale(23);

export const TabBarIcon = (props: TabBarIconProps) => {
    const {colorFocus, colorUnfocus, Icon, focused} = props;
    return (
        <Icon
            width={ICON_SIZE}
            height={ICON_SIZE}
            fill={focused ? colorFocus : colorUnfocus}
        />
    );
};
