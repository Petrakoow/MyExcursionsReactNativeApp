import { Reservation } from '@/shared/db/models';
import Realm from 'realm';


export const addBooking = (
    realm: Realm,
    bookingData: Partial<Reservation>
) => {
    realm.write(() => {
        realm.create(Reservation.schema.name, {
            id: bookingData.id || Math.random().toString(36).slice(2, 9),
            userId: bookingData.userId,
            excursionId: bookingData.excursionId,
            eventTitle: bookingData.eventTitle,
            eventDescription: bookingData.eventDescription,
            reservationDate: bookingData.reservationDate || new Date(),
            eventDate: bookingData.eventDate,
        });
    });
    console.log('Booking added successfully.');
};
