import {palette} from '@/shared/config/colors';
import React, {FC, useState} from 'react';
import {ColorValue, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {CustomText} from '../../customText';
import {TextSize} from '@/shared/config/font';
import {SvgProps} from 'react-native-svg';
import {styles} from './ExpandableComponentStyle';

type ExpandableComponentProps = {
    title: string;
    Icon?: FC<SvgProps>;
    colorIcon?: ColorValue;
    colorHeader?: ColorValue;
    children: React.ReactNode;
    headerTextSize?: TextSize;
};

const ICON_SIZE = moderateScale(20);

export const ExpandableComponent = (props: ExpandableComponentProps) => {
    const {
        title,
        Icon,
        children,
        headerTextSize = TextSize.S_LG,
        colorIcon = palette.light.background,
        colorHeader = palette.light.primary,
    } = props;
    const [expanded, setExpanded] = useState(false);

    const toggleExpansion = () => setExpanded(prev => !prev);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={toggleExpansion}
                style={[styles.header, {backgroundColor: colorHeader}]}>
                <CustomText style={styles.title} size={headerTextSize}>
                    {title}
                </CustomText>
                {Icon && (
                    <View style={styles.icon}>
                        <Icon
                            width={ICON_SIZE}
                            height={ICON_SIZE}
                            fill={colorIcon}
                        />
                    </View>
                )}
            </TouchableOpacity>
            {expanded && <View style={styles.dropdown}>{children}</View>}
        </View>
    );
};
