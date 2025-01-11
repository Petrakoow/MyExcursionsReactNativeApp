import React from 'react';
import {ScrollView, View} from 'react-native';
import {LineSeparator} from '@/shared/ui/customSeparator';
import {Logotype} from '@/shared/ui/customLogo';
import {LinkScreenNavigate} from '@/shared/ui/linkScreen';
import {AppNavigation} from '@/shared/config/navigation/types';
import {CustomText} from '@/shared/ui/customText';
import {ScreenContent} from '@/shared/ui/screenContent';
import {styles} from './SignInScreenStyle';
import {GuestLoginButton, SignInForm} from '@/features/auth/signIn';
import {getUnkownStatus} from '@/shared/db/models/user';

export const AuthScreen = () => {
    return (
        <ScreenContent>
            <ScrollView>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Logotype title="ExcursionApp" />
                    </View>

                    <View style={styles.inputContainer}>
                        <SignInForm />
                    </View>

                    {getUnkownStatus() && (
                        <>
                            <View style={styles.separatorContainer}>
                                <LineSeparator />
                            </View>
                            <View style={styles.continueAsGuestContainer}>
                                <GuestLoginButton />
                            </View>
                        </>
                    )}
                    <View style={styles.accountContainer}>
                        {getUnkownStatus() && (
                            <>
                                <CustomText style={styles.textAccount}>
                                    У вас ещё нету аккаунта?
                                </CustomText>
                                <LinkScreenNavigate
                                    title="Регистрация"
                                    screenName={AppNavigation.SIGN_UP}
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
