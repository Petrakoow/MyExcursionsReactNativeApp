import {ScrollView, View} from 'react-native';
import {CustomButton} from '@/shared/ui/customButton';
import {AnonymousIcon} from '@/shared/assets/icons';
import {styleButton} from '@/shared/ui/customButton';
import {Colors} from '@/shared/config/colors';
import {LineSeparator} from '@/shared/ui/customSeparator';
import {Logotype} from '@/shared/ui/customLogo';
import {LinkScreenNavigate} from '@/shared/ui/linkScreen';
import {
    AppNavigation,
    RootStackParamList,
} from '@/shared/config/navigation/types';
import {CustomText} from '@/shared/ui/customText';
import {ScreenContent} from '@/shared/ui/screenContent';
import {styles} from './SignInScreenStyle';
import {SignInForm} from '@/features/auth/signIn';

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
                            style={[styleButton.secondTypeButton, styleButton.heightFirstType]}
                            textColor={Colors.black}
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
