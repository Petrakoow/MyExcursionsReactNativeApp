import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

export const scheduleNotification = async (
    id: string,
    title: string,
    body: string,
    timestamp: number,
) => {
    const now = Date.now();

    if (timestamp <= now) {
        console.warn(
            `Notification for "${title}" not scheduled: timestamp is in the past.`,
        );
        return;
    }

    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp,
    };

    try {
        await notifee.createTriggerNotification(
            {
                id,
                title,
                body,
                android: {
                    channelId: 'default',
                    smallIcon: 'ic_launcher',
                },
            },
            trigger,
        );
        console.log(
            `Scheduled notification: "${title}" at ${new Date(timestamp)}`,
        );
    } catch (error) {
        console.error(`Error scheduling notification: ${error}`);
    }
};
