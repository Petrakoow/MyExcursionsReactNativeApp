import {
    ColorValue,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from 'react-native';
import React, {ReactNode} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {SvgProps} from 'react-native-svg';
import {CustomText} from '@/shared/ui/customText';
import {palette} from '@/shared/config/colors';
import {styles} from './BottomPanelStyle';

const ICON_SIZE = moderateScale(23);

type BottomPanelType = {
    children: ReactNode;
};

type BottomPanelButtonType = TouchableOpacityProps & {
    title?: string;
    Icon?: React.FC<SvgProps>;
    color?: ColorValue;
};

export const BottomPanel = (props: BottomPanelType) => {
    const {children} = props;
    return <View style={styles.bottomPanel}>{children}</View>;
};

BottomPanel.Button = (props: BottomPanelButtonType) => {
    const {title, Icon, color = palette.light.textPrimaryInv, ...res} = props;
    return (
        <TouchableOpacity {...res}>
            <View style={styles.bottomPanelButtonContainer}>
                {Icon && (
                    <Icon width={ICON_SIZE} height={ICON_SIZE} fill={color} />
                )}
                {title && (
                    <CustomText style={[{color: color}]} numberOfLines={1}>
                        {title}
                    </CustomText>
                )}
            </View>
        </TouchableOpacity>
    );
};
