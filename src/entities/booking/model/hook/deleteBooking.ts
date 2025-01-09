import {Reservation} from '@/shared/db/models';
import Realm from 'realm';

export const deleteBooking = (realm: Realm, bookingId: string) => {
    realm.write(() => {
        const bookingToDelete = realm.objectForPrimaryKey(
            Reservation.schema.name,
            bookingId,
        );

        if (bookingToDelete) {
            realm.delete(bookingToDelete);
            console.log('Booking deleted successfully.');
        }
    });
};
