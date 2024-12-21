import Realm from 'realm';
import { Reservation } from './Reservation';
import { TourTypeRequest } from '@/shared/api';

const addBooking = (
    userId: string,
    orderOption: TourTypeRequest['order_options'][0]
) => {
    const realm = new Realm({ schema: [Reservation] });

    realm.write(() => {
        // Create a reservation for each order line in the order option
        orderOption.order_lines.forEach((line) => {
            const reservationId = Math.random().toString(36).substr(2, 9); // Generate a unique ID
            
            const eventDate = new Date(parseInt(line.start_date) * 1000); // Convert Unix timestamp

            realm.create('Reservation', {
                id: reservationId,
                userId: userId,
                excursionId: orderOption.id, // Excursion ID from order option
                eventTitle: orderOption.title, // Title from order option
                eventDescription: line.title, // Line-specific description
                reservationDate: new Date(), // Current date
                eventDate: eventDate, // Start date of the event
            });
        });
    });

    console.log('Booking(s) added successfully.');
};
