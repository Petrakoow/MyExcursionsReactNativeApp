import {Reservation} from '@/shared/db/models';
import Realm from 'realm';

export const getUserBookings = (
    realm: Realm,
    userId: string,
): Reservation[] => {
    return realm
        .objects<Reservation>(Reservation.schema.name)
        .filtered('userId == $0', userId)
        .slice();
};
