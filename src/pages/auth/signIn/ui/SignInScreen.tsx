import {ScrollView, View} from 'react-native';
import {CustomButton} from '@/shared/ui/customButton';
import {AnonymousIcon} from '@/shared/assets/icons';
import {styleButton} from '@/shared/ui/customButton';
import {LineSeparator} from '@/shared/ui/customSeparator';
import {Logotype} from '@/shared/ui/customLogo';
import {LinkScreenNavigate} from '@/shared/ui/linkScreen';
import {
    AppNavigation,
} from '@/shared/config/navigation/types';
import {CustomText} from '@/shared/ui/customText';
import {ScreenContent} from '@/shared/ui/screenContent';
import {styles} from './SignInScreenStyle';
import {SignInForm} from '@/features/auth/signIn';
import { palette } from '@/shared/config/colors';

export const AuthScreen = () => {
    return (
        <ScreenContent>
            <ScrollView>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Logotype title="TourismApp" />
                    </View>

                    <View style={styles.inputContainer}>
                        <SignInForm />
                    </View>
                    <View style={styles.separatorContainer}>
                        <LineSeparator />
                    </View>
                    <View style={styles.continueAsGuestContainer}>
                        <CustomButton
                            textButton="Продолжить как гость"
                            style={[
                                styleButton.secondTypeButton,
                                styles.heightButton,
                            ]}
                            textColor={palette.light.textPrimary}
                            Icon={AnonymousIcon}
                        />
                    </View>
                    <View style={styles.accountContainer}>
                        <CustomText style={styles.textAccount}>
                            У вас ещё нету аккаунта?
                        </CustomText>
                        <LinkScreenNavigate
                            title="Регистрация"
                            screenName={AppNavigation.SIGN_UP}
                            mustReplace={true}
                        />
                    </View>
                </View>
            </ScrollView>
        </ScreenContent>
    );
};
