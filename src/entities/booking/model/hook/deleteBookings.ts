import {Reservation} from '@/shared/db/models';
import Realm from 'realm';

export const deleteUserBookings = (realm: Realm, userId: string): void => {
    const userBookings = realm
        .objects<Reservation>(Reservation.schema.name)
        .filtered('userId == $0', userId);

    realm.write(() => {
        realm.delete(userBookings);
    });
};
