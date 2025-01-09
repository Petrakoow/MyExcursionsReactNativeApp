import {Reservation} from '@/shared/db/models';
import Realm from 'realm';

export const getExpiredBookings = (realm: Realm) => {
    const now = new Date();
    const expiredBookings = realm
        .objects<Reservation>(Reservation.schema.name)
        .filtered('eventDate < $0', now);

    return expiredBookings;
};
