import {deleteBooking} from '@/entities/booking';
import {cancelBookingNotifications} from '@/features/notifications';
import Realm from 'realm';
export const deleteBookingWithNotifications = (
    realm: Realm,
    bookingId: string,
) => {
    cancelBookingNotifications(bookingId)
        .then(() => {
            deleteBooking(realm, bookingId);
            console.log(
                'Notifications cancelled and booking deleted successfully.',
            );
        })
        .catch(error => {
            console.error('Error during notification cancellation:', error);
        });
};
