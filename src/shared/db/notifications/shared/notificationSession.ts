import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

const NOTIFICATION_SETTINGS_KEY = 'notification_settings';

export type NotificationSettingsType = {
    enabled: boolean;
    notify3DaysBefore: boolean;
    notify1DayBefore: boolean;
    notify1HourBefore: boolean;
};

export const getUserNotificationSettingsKey = (userId: string) => {
    return `${userId}_${NOTIFICATION_SETTINGS_KEY}`;
};

export const saveNotificationSettings = (userId: string, settings: NotificationSettingsType): void => {
    const key = getUserNotificationSettingsKey(userId);
    const jsonValue = JSON.stringify(settings);
    storage.set(key, jsonValue);
    console.log('Notification settings saved for user:', userId);
};

export const getNotificationSettings = (userId: string): NotificationSettingsType | null => {
    const key = getUserNotificationSettingsKey(userId);
    const jsonValue = storage.getString(key);
    if (jsonValue) {
        return JSON.parse(jsonValue) as NotificationSettingsType;
    }
    return null;
};

export const resetNotificationSettings = (userId: string): void => {
    const defaultSettings: NotificationSettingsType = {
        enabled: true,
        notify3DaysBefore: true,
        notify1DayBefore: true,
        notify1HourBefore: true,
    };
    saveNotificationSettings(userId, defaultSettings);
    console.log('Notification settings reset to default for user:', userId);
};
