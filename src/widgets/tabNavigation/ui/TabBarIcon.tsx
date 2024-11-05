import { FC } from 'react';
import { SvgProps } from 'react-native-svg';
import { moderateScale } from 'react-native-size-matters';

type TabBarIconProps = {
  color: string;
  Icon: FC<SvgProps>;
}

const ICON_SIZE = moderateScale(23);

export const TabBarIcon = (props : TabBarIconProps) => {
    const {color, Icon} = props;
    return <Icon width={ICON_SIZE} fill={color}/>
}
