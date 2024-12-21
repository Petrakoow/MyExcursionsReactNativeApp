import React from 'react';
import {View} from 'react-native';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {TextSize} from '@/shared/config/font';
import {useAccountActions} from '../hook/useAccountActions';
import {styles} from './AccountSettingsDataStyle';
import {CustomText} from '@/shared/ui/customText';

export const AccountSettingsData = () => {
    const {logoutUser, confirmDeleteAccount} = useAccountActions();

    return (
        <View style={styles.container}>
            <CustomText>
                Этот раздел предназначен для управления вашим аккаунтом. Здесь
                вы можете выйти из своей учетной записи или удалить её
                полностью, если больше не планируете её использовать.
            </CustomText>
            <CustomButton
                textButton={'Выйти из аккаунта'}
                style={[styleButton.primaryTypeButton, styles.button]}
                textSize={TextSize.S_BASE}
                onPress={logoutUser}
            />
            <CustomButton
                textButton={'Удалить аккаунт'}
                style={[styleButton.warningTypeButton, styles.button]}
                textSize={TextSize.S_BASE}
                onPress={confirmDeleteAccount}
            />
        </View>
    );
};
