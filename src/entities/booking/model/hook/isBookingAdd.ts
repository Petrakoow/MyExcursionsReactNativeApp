import {Reservation} from '@/shared/db/models';
import Realm from 'realm';

export const isBookingAdd = (
    realm: Realm,
    userId: string,
    excursionId: number,
    eventDate: Date,
    excursionType: string,
): boolean => {
    const bookings = realm
        .objects<Reservation>(Reservation.schema.name)
        .filtered(
            'userId == $0 AND excursionId == $1 AND eventDate == $2 AND eventTitle == $3',
            userId,
            excursionId,
            eventDate,
            excursionType,
        );

    return bookings.length > 0;
};
