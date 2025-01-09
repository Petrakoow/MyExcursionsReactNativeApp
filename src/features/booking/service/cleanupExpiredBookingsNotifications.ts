import Realm from 'realm';
import {cancelBookingNotifications} from '@/features/notifications';
import {deleteBooking, getExpiredBookings} from '@/entities/booking';

export const cleanupExpiredBookingsWithNotifications = (realm: Realm) => {
    const expiredBookings = getExpiredBookings(realm);

    expiredBookings.forEach(booking => {
        cancelBookingNotifications(booking.id)
            .then(() => {
                deleteBooking(realm, booking.id);
            })
            .catch(error => {
                console.error(
                    `Error cancelling notifications for booking ${booking.id}:`,
                    error,
                );
            });
    });
};
