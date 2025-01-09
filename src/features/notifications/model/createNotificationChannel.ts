import notifee, {AndroidImportance} from '@notifee/react-native';

export const createNotificationChannel = async () => {
    try {
        await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            importance: AndroidImportance.HIGH,
        });
        console.log('Notification channel created.');
    } catch (error) {
        console.error('Failed to create notification channel:', error);
    }
};
