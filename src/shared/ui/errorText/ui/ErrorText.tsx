import {View} from 'react-native';
import React from 'react';
import {CustomText} from '../../customText';
import {styles} from './ErrorTestStyle';
import {TextSize, TextWeight} from '@/shared/config/font';

type ErrorTextType = {
    title?: string;
    description: string;
};

export const ErrorText = (props: ErrorTextType) => {
    const {title = 'Error', description} = props;
    return (
        <View style={styles.container}>
            <CustomText
                size={TextSize.S_LG}
                weight={TextWeight.MEDIUM}
                style={styles.titleError}>
                {title}
            </CustomText>
            <View>
                <CustomText style={styles.descriptionError}>
                    {description}
                </CustomText>
            </View>
        </View>
    );
};
