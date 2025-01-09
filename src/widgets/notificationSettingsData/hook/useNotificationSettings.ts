import {useState, useEffect} from 'react';
import notifee from '@notifee/react-native';
import {
    getNotificationSettings,
    NotificationSettingsType,
    resetNotificationSettings,
    saveNotificationSettings,
} from '@/shared/db/notifications';

export const useNotificationSettings = () => {
    const [settings, setSettings] = useState<NotificationSettingsType | null>(
        null,
    );
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    useEffect(() => {
        const loadSettings = async () => {
            const storedSettings = getNotificationSettings();
            if (storedSettings) {
                setSettings(storedSettings);
            } else {
                resetNotificationSettings();
                setSettings(getNotificationSettings());
            }
        };

        const checkPermissions = async () => {
            const permissionStatus = await notifee.getNotificationSettings();
            setHasPermission(permissionStatus.authorizationStatus === 1);
        };

        loadSettings();
        checkPermissions();
    }, []);

    const requestPermissions = async () => {
        const permissionStatus = await notifee.requestPermission();
        if (permissionStatus.authorizationStatus === 1) {
            setHasPermission(true);
        } else {
            setHasPermission(false);
        }
    };

    const cancelNotificationsBySuffix = async (suffix: string) => {
        const [displayedNotifications, triggerNotifications] =
            await Promise.all([
                notifee.getDisplayedNotifications(),
                notifee.getTriggerNotifications(),
            ]);

        const notifications = [
            ...displayedNotifications.map(dn => ({
                id: dn.id,
            })),
            ...triggerNotifications.map(tn => ({
                id: tn.notification?.id,
            })),
        ];

        notifications.forEach(notification => {
            if (notification.id && notification.id.endsWith(suffix)) {
                notifee.cancelNotification(notification.id);
                console.log('Deleted notification with ID:', notification.id);
            }
        });
    };

    const handleToggle = (key: keyof NotificationSettingsType) => {
        if (settings) {
            const updatedSettings = {...settings, [key]: !settings[key]};
            setSettings(updatedSettings);
            saveNotificationSettings(updatedSettings);

            if (key === 'enabled' && !updatedSettings.enabled) {
                notifee.cancelAllNotifications();
            }

            if (
                key === 'notify3DaysBefore' &&
                !updatedSettings.notify3DaysBefore
            ) {
                cancelNotificationsBySuffix('-3days');
            } else if (
                key === 'notify1DayBefore' &&
                !updatedSettings.notify1DayBefore
            ) {
                cancelNotificationsBySuffix('-1day');
            } else if (
                key === 'notify1HourBefore' &&
                !updatedSettings.notify1HourBefore
            ) {
                cancelNotificationsBySuffix('-1hour');
            }
        }
    };

    return {
        settings,
        hasPermission,
        requestPermissions,
        handleToggle,
    };
};
