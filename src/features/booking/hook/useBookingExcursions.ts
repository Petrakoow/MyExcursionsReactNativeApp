import {getUserBookings} from '@/entities/booking';
import {checkStatus} from '@/entities/status';
import {useDatabase} from '@/provider';
import {Reservation, Status} from '@/shared/db/models';
import {getUserSession} from '@/shared/db/models/user';
import {useState, useEffect, useMemo} from 'react';

export const useBookingExcursions = () => {
    const [bookings, setBookings] = useState<Reservation[]>([]);
    const [isVerified, setIsVerified] = useState(false);
    const userId = useMemo(() => getUserSession()?.userId, []);
    const database = useDatabase();

    useEffect(() => {
        if (!userId) {
            return;
        }

        const userBookings = database.objects<Reservation>(
            Reservation.schema.name,
        );

        const statusUser = database.objects<Status>(Status.schema.name);

        const bookingChange = () => {
            const updatedBookings = getUserBookings(database, userId);
            setBookings(updatedBookings);
        };

        const statusChange = () => {
            const updateStatus = checkStatus(database, userId);
            setIsVerified(updateStatus);
        };

        userBookings.addListener(bookingChange);

        statusUser.addListener(statusChange);

        setBookings(getUserBookings(database, userId));

        setIsVerified(checkStatus(database, userId));

        return () => {
            userBookings.removeListener(bookingChange);
            statusUser.removeListener(statusChange);
        };
    }, [database, userId]);

    return {bookings, isVerified};
};
