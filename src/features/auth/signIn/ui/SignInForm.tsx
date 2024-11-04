import {View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import {validationSignInSchema} from '../model/validation';
import {createCommonLine} from '@/shared/utils';
import {CustomInput} from '@/shared/ui/customInput';
import {CustomButton} from '@/shared/ui/customButton';
import {styles} from './SignInFormStyles';
import {ErrorText} from '@/shared/ui/errorText';
import {styleButton} from '@/shared/ui/customButton';
import {useSignIn} from '../hook/useSignIn';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
    AppNavigation,
    RootStackParamList,
} from '@/shared/config/navigation/navigation';

type SignProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, AppNavigation.SIGN_IN>;
};

export const SignInForm = ({navigation}: SignProps) => {
    const {signIn, loading, error} = useSignIn();

    const navigateToMainMenu = () => {
        navigation.reset({
            index: 0,
            routes: [{name: AppNavigation.MAIN}],
        });
    };
    return (
        <Formik
            initialValues={{emailOrUsername: '', password: ''}}
            validationSchema={validationSignInSchema}
            validateOnChange={false}
            onSubmit={async (values, {resetForm}) => {
                const {emailOrUsername, password} = values;
                const uid = await signIn(emailOrUsername, password);

                if (uid) {
                    console.log('User registered with UID:', uid);
                    resetForm();
                    navigateToMainMenu();
                }
            }}>
            {({handleChange, handleSubmit, resetForm, errors, values}) => {
                const errorsLine = createCommonLine(errors);
                return (
                    <View>
                        <View style={styles.inputContainer}>
                            <CustomInput
                                label="Email or Username"
                                placeholder="ex@example.com or example"
                                onChangeText={handleChange('emailOrUsername')}
                                value={values.emailOrUsername}
                            />
                            <CustomInput
                                label="Password"
                                placeholder="example123..."
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                value={values.password}
                            />
                            {errorsLine && (
                                <ErrorText
                                    title="Validation Error"
                                    description={errorsLine}
                                />
                            )}
                            {error && (
                                <ErrorText
                                    title="Login Error"
                                    description={error}
                                />
                            )}
                        </View>
                        <View style={styles.continueContainer}>
                            <CustomButton
                                onPress={() => handleSubmit()}
                                textButton="Continue"
                                style={styleButton.firstTypeButton}
                                disabled={loading}
                            />
                        </View>
                    </View>
                );
            }}
        </Formik>
    );
};
