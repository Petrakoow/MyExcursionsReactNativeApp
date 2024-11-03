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
import React from 'react';

export const SignUpForm = () => {
    const {signUp, loading, error} = useSignUp();
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
                const uid = await signUp(email, password, username);

                if (uid) {
                    console.log('User registered with UID:', uid);
                    resetForm();
                }
            }}>
            {({handleChange, handleSubmit, values, errors}) => {
                const errorsLine = createCommonLine(errors);
                return (
                    <View style={styles.container}>
                        <View style={styles.inputContainer}>
                            <CustomInput
                                label="Email"
                                placeholder="example@example.com"
                                onChangeText={handleChange('email')}
                                keyboardType="email-address"
                                value={values.email}
                            />

                            <CustomInput
                                label="Username"
                                placeholder="User123..."
                                onChangeText={handleChange('username')}
                                keyboardType="default"
                                value={values.username}
                            />
                            <CustomInput
                                label="Password"
                                placeholder="example123..."
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                value={values.password}
                            />
                            <CustomInput
                                label="Confirm password"
                                placeholder="example123..."
                                secureTextEntry={true}
                                onChangeText={handleChange('confirmPassword')}
                                value={values.confirmPassword}
                            />
                        </View>
                        <View style={styles.informationContainer}>
                            {errorsLine && (
                                <ErrorText
                                    title="Validation Error"
                                    description={errorsLine}
                                />
                            )}
                            {error && (
                                <ErrorText
                                    title="Registration Error"
                                    description={error}
                                />
                            )}
                            <ExplanationText description="Password must be at least 8 character" />
                            <ExplanationText description="Password must contain numbers" />
                        </View>
                        <View>
                            <CustomButton
                                textButton="Agree and continue"
                                style={styleButton.firstTypeButton}
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
