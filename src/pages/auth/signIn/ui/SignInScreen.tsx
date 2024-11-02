import {StyleSheet, View} from 'react-native';
import {Formik} from 'formik';
import {CustomInput} from '@/shared/ui/customInput';
import {CustomButton} from '@/shared/ui/customButton';
import {AnonymousIcon} from '@/shared/assets/icons';
import {styleButton} from '@/shared/ui/customButton';
import {Colors} from '@/shared/config/colors';
import {LineSeparator} from '@/shared/ui/customSeparator';
import {Logotype} from '@/shared/ui/customLogo';
import {LinkScreen} from '@/shared/ui/linkScreen';
import {AppNavigation} from '@/shared/config/navigation/navigation';
import {CustomText} from '@/shared/ui/customText';
import {moderateScale} from 'react-native-size-matters';
import {ScreenContent} from '@/shared/ui/screenContent/ui/ScreenContent';

// ScreenContent
export const AuthScreen = () => {
    return (
        <ScreenContent>
            <Formik
                initialValues={{email: '', username: '', password: ''}}
                onSubmit={values => console.log(values)}>
                {({handleChange, handleBlur, handleSubmit, values}) => (
                    <View>
                        <View>
                            <Logotype title="TourismApp" />
                        </View>
                        <View style={styles.inputContainer}>
                            <CustomInput
                                label="Email or Username"
                                placeholder="ex@example.com or example"
                            />
                            <CustomInput
                                label="Password"
                                placeholder="example123..."
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={styles.buttonContinue}>
                            <CustomButton
                                textButton="Continue"
                                style={styleButton.firstTypeButton}
                            />
                        </View>
                        <View style={styles.link}>
                            <LinkScreen
                                title="Forgot password?"
                                screenName={AppNavigation.FORGOT_PASSWORD}
                            />
                        </View>
                        <View style={styles.separator}>
                            <LineSeparator />
                        </View>

                        <CustomButton
                            textButton="Continue as guest"
                            style={styleButton.secondTypeButton}
                            textColor={Colors.black}
                            Icon={AnonymousIcon}
                        />
                        <View style={styles.account}>
                            <CustomText style={styles.textAccount}>
                                Don't have account?
                            </CustomText>
                            <LinkScreen
                                title="Sign Up"
                                screenName={AppNavigation.SIGN_UP}
                            />
                        </View>
                    </View>
                )}
            </Formik>
        </ScreenContent>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        gap: moderateScale(12),
        marginBottom: moderateScale(32),
    },
    link: {
        alignSelf: 'center',
        marginBottom: moderateScale(24),
    },
    separator: {
        marginBottom: moderateScale(24),
    },
    account: {
        flexDirection: 'row',
        gap: moderateScale(10),
        alignSelf: 'center',
    },
    textAccount: {
        alignSelf: 'flex-start',
    },
    buttonContinue: {
        marginBottom: moderateScale(16),
    },
});
