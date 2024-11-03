import {ColorValue, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomText} from '../../customText';
import {Checkmark} from '@/shared/assets/icons';
import {moderateScale} from 'react-native-size-matters';
import {TextSize} from '@/shared/config/font';
import {styles} from './ExplanationTextStyle';

type ExplanationTextType = {
    description: string;
};

const ICON_SIZE = moderateScale(28);

export const ExplanationText = (props: ExplanationTextType) => {
    const {description = 'Write you explanatation there'} = props;
    return (
        <View style={styles.container}>
            <Checkmark width={ICON_SIZE} height={ICON_SIZE} />
            <CustomText size={TextSize.S_LG}>{description}</CustomText>
        </View>
    );
};
