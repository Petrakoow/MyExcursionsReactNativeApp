import React from 'react';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {TextSize} from '@/shared/config/font';
import {styles} from './BookingModalStyle';
import {View} from 'react-native';

type CloseButtonProps = {
    onClose: () => void;
};

export const CloseButton = (props: CloseButtonProps) => {
    const {onClose} = props;
    return (
        <View style={[styles.content, styles.closeContent]}>
            <CustomButton
                textButton="Закрыть"
                onPress={onClose}
                style={[styleButton.primaryTypeButton, styles.closeButton]}
                textSize={TextSize.S_BASE}
            />
        </View>
    );
};
