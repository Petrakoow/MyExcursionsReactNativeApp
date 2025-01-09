import notifee from '@notifee/react-native';

export const cancelBookingNotifications = (bookingId: string) => {
    const notificationIds = [
        `${bookingId}-3days`,
        `${bookingId}-1day`,
        `${bookingId}-1hour`,
    ];

    return Promise.all(
        notificationIds.map(notificationId =>
            notifee
                .cancelNotification(notificationId)
                .then(() =>
                    console.log(
                        `Notification ${notificationId} cancelled successfully.`,
                    ),
                )
                .catch(error =>
                    console.error(
                        `Error canceling notification ${notificationId}: ${error}`,
                    ),
                ),
        ),
    );
};
