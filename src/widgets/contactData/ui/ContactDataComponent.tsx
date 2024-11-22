import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomText} from '@/shared/ui/customText';
import {CustomInput} from '@/shared/ui/customInput';
import {TextSize, TextWeight} from '@/shared/config/font';
import {GAP_BASE, moderateScale} from '@/shared/config/dimensions';
import {palette} from '@/shared/config/colors';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {ErrorText} from '@/shared/ui/errorText';
import {Formik} from 'formik';
import {validationSchemaContact} from '../model/validationSchema';
import {formatPhoneNumber} from '@/shared/utils';
import {useDatabase} from '@/app/providers';
import {getUserSession, UserSessionType} from '@/shared/db/models/user';
import {getUser, updateUser} from '@/entities/user/model';
import {SuccessText} from '@/shared/ui/successText';
import Realm from 'realm';

type ContactDataComponentType = {
    session: UserSessionType;
    database: Realm;
};

export const ContactDataComponent = (props: ContactDataComponentType) => {
    const {session, database} = props;
    const [initialValues, setInitialValues] = useState({
        name: '',
        phone: '',
    });
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const userId = session?.userId;
        if (userId) {
            const user = getUser(database, userId);
            if (user) {
                setInitialValues({
                    name: user.name || '',
                    phone: user.phoneNumber || '',
                });
            }
        }
    }, [database, session?.userId]);

    const handleSubmit = (values: typeof initialValues) => {
        const formattedPhone = formatPhoneNumber(values.phone);
        console.log('Сохраненные данные:', {
            name: values.name,
            phone: formattedPhone,
        });

        const userId = session?.userId;

        if (userId) {
            updateUser(database, userId, {
                name: values.name,
                phoneNumber: formattedPhone,
            });
            setIsSuccess(true);
        }
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchemaContact}
            onSubmit={handleSubmit}>
            {({
                handleChange,
                handleSubmit,
                values,
                errors,
                setFieldTouched,
            }) => {
                useEffect(() => {
                    if (Object.keys(errors).length > 0) {
                        setIsSuccess(false);
                    }
                }, [errors]);

                return (
                    <View style={styles.container}>
                        <CustomText
                            size={TextSize.S_LG}
                            weight={TextWeight.BOLD}
                            style={styles.textInformation}>
                            Перед бронированием вам необходимо заполнить
                            контактные данные
                        </CustomText>
                        <CustomInput
                            label="Ваши инициалы (используются при бронировании)"
                            placeholder="Иванов И.И."
                            value={values.name}
                            onChangeText={handleChange('name')}
                            onBlur={() => setFieldTouched('name')}
                            labelSize={TextSize.S_LG}
                            style={styles.input}
                        />
                        <CustomInput
                            label="Номер телефона (используются при бронировании)"
                            placeholder="+7(999)999-99-99"
                            value={values.phone}
                            onChangeText={handleChange('phone')}
                            onBlur={() => setFieldTouched('phone')}
                            labelSize={TextSize.S_LG}
                            style={[styles.input, styles.inputEnd]}
                        />
                        <CustomButton
                            onPress={() => handleSubmit()}
                            textButton="Сохранить контактные данные"
                            style={[
                                styleButton.warningTypeButton,
                                styles.button,
                            ]}
                            textSize={TextSize.S_LG}
                        />
                        {Object.values(errors).length > 0 && (
                            <ErrorText
                                title="Ошибка валидации"
                                description={Object.values(errors).join('\n')}
                            />
                        )}
                        {Object.values(errors).length === 0 && isSuccess && (
                            <SuccessText
                                title="Данные сохранены"
                                description="Ваши контактные данные успешно сохранены."
                            />
                        )}
                    </View>
                );
            }}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: GAP_BASE + 5,
    },
    textInformation: {
        color: palette.light.error,
    },
    input: {
        paddingVertical: moderateScale(5),
    },
    inputEnd: {
        marginBottom: moderateScale(10),
    },
    button: {
        paddingVertical: moderateScale(5),
    },
});
