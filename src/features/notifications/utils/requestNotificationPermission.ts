import notifee, {AuthorizationStatus} from '@notifee/react-native';

export const requestNotificationPermission = async () => {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
        console.log('Notification permission granted');
    } else {
        console.log('Notification permission denied');
    }
};
