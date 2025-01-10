import React from 'react';
import {useSignGuestIn} from '../hook/useSignGuestIn';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import { AnonymousIcon } from '@/shared/assets/icons';
import { palette } from '@/shared/config/colors';
import { styles } from './SignInFormStyles';

export const GuestLoginButton = () => {
    const {signInAsGuest} = useSignGuestIn();

    const handleGuestLogin = async () => {
        await signInAsGuest();
    };

    return (
        <CustomButton
            textButton="Продолжить как гость"
            style={[styleButton.secondaryTypeButton, styles.heightButton]}
            textColor={palette.light.textPrimary}
            Icon={AnonymousIcon}
            onPress={handleGuestLogin}
        />
    );
};
