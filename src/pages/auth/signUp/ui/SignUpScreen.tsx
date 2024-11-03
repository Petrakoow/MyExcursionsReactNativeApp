import {View} from 'react-native';
import React from 'react';
import {ScreenContent} from '@/shared/ui/screenContent';
import {CustomText} from '@/shared/ui/customText';
import {Logotype} from '@/shared/ui/customLogo';
import {LinkScreenNavigate} from '@/shared/ui/linkScreen';
import {AppNavigation} from '@/shared/config/navigation/navigation';
import {SignUpForm} from '@/features/auth/signUp';
import {styles} from './SignUpScreenStyle';

export const RegistrationScreen = () => {
    return (
        <ScreenContent>
            <View style={styles.container}>
                <Logotype title="TourismApp" />
                <SignUpForm />
                <View style={styles.accountContainer}>
                    <CustomText style={styles.textAccount}>
                        You have account?
                    </CustomText>
                    <LinkScreenNavigate
                        title="Sign In"
                        screenName={AppNavigation.SIGN_IN}
                        mustReplace={true}
                    />
                </View>
            </View>
        </ScreenContent>
    );
};
