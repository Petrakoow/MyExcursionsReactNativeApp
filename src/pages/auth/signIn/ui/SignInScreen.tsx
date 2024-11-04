import {View} from 'react-native';
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
} from '@/shared/config/navigation/navigation';
import {CustomText} from '@/shared/ui/customText';
import {ScreenContent} from '@/shared/ui/screenContent';
import {styles} from './SignInScreenStyle';
import {SignInForm} from '@/features/auth/signIn';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type AuthScreenType = NativeStackScreenProps<
    RootStackParamList,
    AppNavigation.SIGN_IN
>;

export const AuthScreen = (props: AuthScreenType) => {
    return (
        <ScreenContent>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Logotype title="TourismApp" />
                </View>
                <SignInForm navigation={props.navigation} />
                <View style={styles.linkContainer}>
                    <LinkScreenNavigate
                        title="Forgot password?"
                        screenName={AppNavigation.FORGOT_PASSWORD}
                    />
                </View>
                <View style={styles.separatorContainer}>
                    <LineSeparator />
                </View>
                <View style={styles.continueAsGuestContainer}>
                    <CustomButton
                        textButton="Continue as guest"
                        style={styleButton.secondTypeButton}
                        textColor={Colors.black}
                        Icon={AnonymousIcon}
                    />
                </View>
                <View style={styles.accountContainer}>
                    <CustomText style={styles.textAccount}>
                        Don't have an account?
                    </CustomText>
                    <LinkScreenNavigate
                        title="Sign Up"
                        screenName={AppNavigation.SIGN_UP}
                        mustReplace={true}
                    />
                </View>
            </View>
        </ScreenContent>
    );
};
