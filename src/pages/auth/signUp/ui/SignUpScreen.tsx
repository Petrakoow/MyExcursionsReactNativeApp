import {ScrollView, View} from 'react-native';
import React from 'react';
import {ScreenContent} from '@/shared/ui/screenContent';
import {CustomText} from '@/shared/ui/customText';
import {Logotype} from '@/shared/ui/customLogo';
import {LinkScreenNavigate} from '@/shared/ui/linkScreen';
import {AppNavigation} from '@/shared/config/navigation/types';
import {SignUpForm} from '@/features/auth/signUp';
import {styles} from './SignUpScreenStyle';
import {getUnkownStatus} from '@/shared/db/models/user';

export const RegistrationScreen = () => {
    return (
        <ScreenContent>
            <ScrollView>
                <View style={styles.content}>
                    <Logotype title="ExcursionApp" />
                    <SignUpForm />
                    <View style={styles.accountContainer}>
                        {getUnkownStatus() && (
                            <>
                                <CustomText style={styles.textAccount}>
                                    У вас уже есть аккаунт?
                                </CustomText>
                                <LinkScreenNavigate
                                    title="Авторизация"
                                    screenName={AppNavigation.SIGN_IN}
                                    mustReplace={true}
                                />
                            </>
                        )}
                    </View>
                </View>
            </ScrollView>
        </ScreenContent>
    );
};
