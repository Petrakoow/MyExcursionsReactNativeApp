import Realm from 'realm';

import {Reservation} from '@/shared/db/models';
import {addBooking} from '@/entities/booking';
import {UNKNOWN} from '@/shared/config/constants';
import {scheduleEventNotifications} from '@/features/notifications';

export const createBookingWithNotifications = (
    realm: Realm,
    bookingData: Partial<Reservation>,
) => {
    addBooking(realm, bookingData);

    if (bookingData.eventDate) {
        scheduleEventNotifications(
            bookingData.id || Math.random().toString(36).slice(2, 9),
            bookingData.eventTitle || UNKNOWN,
            bookingData.eventDate,
        );
    }
};
