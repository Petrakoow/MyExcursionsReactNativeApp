import React from 'react';
import {View, Switch} from 'react-native';
import {CustomText} from '@/shared/ui/customText';
import {TextSize, TextWeight} from '@/shared/config/font';
import {ErrorText} from '@/shared/ui/errorText';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {useNotificationSettings} from '../hook/useNotificationSettings';
import {styles} from './NotificationSettingsDataStyle';
import { getUserSession } from '@/shared/db/models/user';
import { UNKNOWN_USER } from '@/shared/config/constants';
export const NotificationSettingsData = () => {
    const userId = getUserSession()?.userId || UNKNOWN_USER;
    const {settings, hasPermission, requestPermissions, handleToggle} =
        useNotificationSettings(userId);

    if (!settings || hasPermission === null) {
        return <CustomText>Loading...</CustomText>;
    }

    return (
        <View>
            {hasPermission ? (
                <View>
                    <CustomText
                        size={TextSize.S_LG}
                        weight={TextWeight.BOLD}
                        style={styles.title}>
                        Настройка уведомлений
                    </CustomText>
                    <View style={styles.row}>
                        <CustomText>Включить уведомления</CustomText>
                        <Switch
                            value={settings.enabled}
                            onValueChange={() => handleToggle('enabled')}
                        />
                    </View>
                    <View style={styles.row}>
                        <CustomText>Уведомлять за 3 дня</CustomText>
                        <Switch
                            value={settings.notify3DaysBefore}
                            onValueChange={() =>
                                handleToggle('notify3DaysBefore')
                            }
                            disabled={!settings.enabled}
                        />
                    </View>
                    <View style={styles.row}>
                        <CustomText>Уведомлять за 1 день</CustomText>
                        <Switch
                            value={settings.notify1DayBefore}
                            onValueChange={() =>
                                handleToggle('notify1DayBefore')
                            }
                            disabled={!settings.enabled}
                        />
                    </View>
                    <View style={styles.row}>
                        <CustomText>Уведомлять за 1 час</CustomText>
                        <Switch
                            value={settings.notify1HourBefore}
                            onValueChange={() =>
                                handleToggle('notify1HourBefore')
                            }
                            disabled={!settings.enabled}
                        />
                    </View>
                    <ErrorText
                        title="Предупреждение"
                        description="Отключив уведомление и снова включив вы не получите от текущих бронирований нужных вам уведомлений, помните об этом"
                    />
                </View>
            ) : (
                <View>
                    <ErrorText
                        description="Уведомления отключены на уровне системы."
                        title="Уведомления не доступны"
                    />
                    <CustomButton
                        textButton="Включить уведомления"
                        style={[
                            styleButton.warningTypeButton,
                            styles.buttonWarning,
                        ]}
                        textSize={TextSize.S_BASE}
                        onPress={requestPermissions}
                    />
                </View>
            )}
        </View>
    );
};
