import {View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import {CustomText} from '@/shared/ui/customText';
import {CustomInput} from '@/shared/ui/customInput';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {ErrorText} from '@/shared/ui/errorText';
import {SuccessText} from '@/shared/ui/successText';
import {validationSchemaContact} from '../model/validationSchema';
import {styles} from './ContactDataComponentStyle';
import {useContactData} from '../hook/useContactData';
import {TextSize, TextWeight} from '@/shared/config/font';
import {UserSessionType} from '@/shared/db/models/user';
import Realm from 'realm';
type ContactDataComponentType = {
    session: UserSessionType;
    database: Realm;
};

export const ContactDataComponent = (props: ContactDataComponentType) => {
    const {session, database} = props;
    const {initialValues, isSuccess, setIsSuccess, handleSubmit} =
        useContactData({session, database});

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
                if (Object.keys(errors).length > 0) {
                    setIsSuccess(false);
                }
                return (
                    <View style={styles.container}>
                        <CustomText
                            weight={TextWeight.BOLD}
                            size={TextSize.S_LG}
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
                            labelSize={TextSize.S_BASE}
                            style={styles.input}
                        />
                        <CustomInput
                            label="Номер телефона (используются при бронировании)"
                            placeholder="+7(999)999-99-99"
                            value={values.phone}
                            onChangeText={handleChange('phone')}
                            onBlur={() => setFieldTouched('phone')}
                            labelSize={TextSize.S_BASE}
                            style={[styles.input, styles.inputEnd]}
                        />
                        <CustomButton
                            onPress={() => handleSubmit()}
                            textButton="Сохранить контактные данные"
                            textSize={TextSize.S_BASE}
                            style={[
                                styleButton.warningTypeButton,
                                styles.button,
                            ]}
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
