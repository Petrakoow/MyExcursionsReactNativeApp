import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

const NOTIFICATION_SETTINGS_KEY = 'notification_settings';

export type NotificationSettingsType = {
    enabled: boolean;
    notify3DaysBefore: boolean;
    notify1DayBefore: boolean;
    notify1HourBefore: boolean;
};

export const saveNotificationSettings = (settings: NotificationSettingsType): void => {
    const jsonValue = JSON.stringify(settings);
    storage.set(NOTIFICATION_SETTINGS_KEY, jsonValue);
    console.log('Notification settings saved.');
};

export const getNotificationSettings = (): NotificationSettingsType | null => {
    const jsonValue = storage.getString(NOTIFICATION_SETTINGS_KEY);
    if (jsonValue) {
        return JSON.parse(jsonValue) as NotificationSettingsType;
    }
    return null;
};

export const resetNotificationSettings = (): void => {
    const defaultSettings: NotificationSettingsType = {
        enabled: true,
        notify3DaysBefore: true,
        notify1DayBefore: true,
        notify1HourBefore: true,
    };
    saveNotificationSettings(defaultSettings);
    console.log('Notification settings reset to default.');
};
