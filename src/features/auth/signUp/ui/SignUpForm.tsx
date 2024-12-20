import {View} from 'react-native';
import {CustomInput} from '@/shared/ui/customInput';
import {CustomButton} from '@/shared/ui/customButton';
import {styleButton} from '@/shared/ui/customButton';
import {createCommonLine} from '@/shared/utils';
import {Formik} from 'formik';
import {validationSignUpSchema} from '../model/validation';
import {styles} from './SignUpFormStyles';
import {ErrorText} from '@/shared/ui/errorText';
import {ExplanationText} from '@/shared/ui/explanationText';
import {useSignUp} from '../hook/useSignUp';
import React, {useState} from 'react';
import {SuccessText} from '@/shared/ui/successText';

export const SignUpForm = () => {
    const {signUp, loading, error} = useSignUp();
    const [success, setSuccess] = useState(false);
    return (
        <Formik
            initialValues={{
                email: '',
                username: '',
                password: '',
                confirmPassword: '',
            }}
            validationSchema={validationSignUpSchema}
            validateOnChange={false}
            onSubmit={async (values, {resetForm}) => {
                const {email, password, username} = values;
                await signUp(email, password, username);

                if (!error) {
                    resetForm();
                    setSuccess(true);
                } else{
                    setSuccess(false);
                }
            }}>
            {({handleChange, handleSubmit, values, errors}) => {
                const errorsLine = createCommonLine(errors);
                return (
                    <View style={styles.container}>
                        <View style={styles.inputContainer}>
                            <CustomInput
                                label="Почта"
                                placeholder="example@example.com"
                                onChangeText={handleChange('email')}
                                keyboardType="email-address"
                                value={values.email}
                            />

                            <CustomInput
                                label="Имя пользователя"
                                placeholder="example..."
                                onChangeText={handleChange('username')}
                                keyboardType="default"
                                value={values.username}
                            />
                            <CustomInput
                                label="Пароль"
                                placeholder="example..."
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                value={values.password}
                            />
                            <CustomInput
                                label="Подвердите пароль"
                                placeholder="example"
                                secureTextEntry={true}
                                onChangeText={handleChange('confirmPassword')}
                                value={values.confirmPassword}
                            />
                        </View>
                        <View style={styles.informationContainer}>
                            {errorsLine && (
                                <ErrorText
                                    title="Ошибка валидации"
                                    description={errorsLine}
                                />
                            )}
                            {error && (
                                <ErrorText
                                    title="Ошибка при регистрации"
                                    description={error}
                                />
                            )}
                            {success && (
                                <SuccessText title="Регистрация прошла успешно" />
                            )}
                            <ExplanationText description="Пароль должен быть минимум 8 символов" />
                            <ExplanationText description="Пароль должен содержать цифры" />
                        </View>
                        <View>
                            <CustomButton
                                textButton="Подвердить и продолжить"
                                style={[
                                    styleButton.primaryTypeButton,
                                    styles.heightButton,
                                ]}
                                onPress={() => handleSubmit()}
                                disabled={loading}
                            />
                        </View>
                    </View>
                );
            }}
        </Formik>
    );
};
