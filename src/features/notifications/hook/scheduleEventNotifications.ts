import {getNotificationSettings} from '@/shared/db/notifications';
import {scheduleNotification} from './scheduleNotification';

export const scheduleEventNotifications = async (
    id: string,
    title: string,
    eventDate: Date,
) => {
    const settings = getNotificationSettings();
    if (!settings || !settings.enabled) return;

    const eventTime = eventDate.getTime();
    const now = Date.now();
    console.log('Event time:', eventTime);

    const threeDaysBefore = eventTime - 3 * 24 * 60 * 60 * 1000;
    const oneDayBefore = eventTime - 1 * 24 * 60 * 60 * 1000;
    const oneHourBefore = eventTime - 1 * 60 * 60 * 1000;

    if (settings.notify3DaysBefore && threeDaysBefore > now) {
        await scheduleNotification(
            `${id}-3days`,
            `Скорое событие: ${title}`,
            'До вашего события осталось 3 дня!',
            threeDaysBefore,
        );
    }

    if (settings.notify1DayBefore && oneDayBefore > now) {
        await scheduleNotification(
            `${id}-1day`,
            `Скорое событие: ${title}`,
            'До вашего события остался один день!',
            oneDayBefore,
        );
    }

    if (settings.notify1HourBefore && oneHourBefore > now) {
        await scheduleNotification(
            `${id}-1hour`,
            `Скорое событие: ${title}`,
            'До вашего события осталось 1 час!',
            oneHourBefore,
        );
    }
};
