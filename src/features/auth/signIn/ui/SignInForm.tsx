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

export const SignInForm = () => {
    const {signIn, loading, error} = useSignIn();

    return (
        <Formik
            initialValues={{emailOrUsername: '', password: ''}}
            validationSchema={validationSignInSchema}
            validateOnChange={false}
            onSubmit={async values => {
                const {emailOrUsername, password} = values;
                await signIn(emailOrUsername, password);
            }}>
            {({handleChange, handleSubmit, errors, values}) => {
                const errorsLine = createCommonLine(errors);
                return (
                    <View>
                        <View style={styles.inputContainer}>
                            <CustomInput
                                label="Почта или логин"
                                placeholder="example@example.com"
                                onChangeText={handleChange('emailOrUsername')}
                                value={values.emailOrUsername}
                            />
                            <CustomInput
                                label="Пароль"
                                placeholder="example"
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                value={values.password}
                            />
                            {errorsLine && (
                                <ErrorText
                                    title="Ошибка валидации"
                                    description={errorsLine}
                                />
                            )}
                            {error && (
                                <ErrorText
                                    title="Ошибка при авторизации"
                                    description={error}
                                />
                            )}
                        </View>
                        <View style={styles.continueContainer}>
                            <CustomButton
                                onPress={() => handleSubmit()}
                                textButton="Продолжить"
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
