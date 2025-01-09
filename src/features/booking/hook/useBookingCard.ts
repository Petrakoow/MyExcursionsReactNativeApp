import {fetchTourInfo} from '@/entities/api';
import {TourTypeRequest} from '@/shared/api';
import {Reservation} from '@/shared/db/models';
import {confirmAction} from '@/shared/utils';
import {useState, useEffect} from 'react';
import Realm from 'realm';
import { deleteBookingWithNotifications } from '../service/deleteBookingWithNotifications';
type BookingCardProps = {
    booking: Reservation;
    database: Realm;
};

const HOURS = 3600000;
const MINUTES = 60000;
const SECONDS = 1000;

export const useBookingCard = (props: BookingCardProps) => {
    const {booking, database} = props;
    const [excursion, setExcursion] = useState<TourTypeRequest | null>(null);
    const [remainingTime, setRemainingTime] = useState<number>(0);

    useEffect(() => {
        const loadExcursion = async () => {
            try {
                const fetchedExcursion = await fetchTourInfo(
                    booking.excursionId,
                );
                setExcursion(fetchedExcursion);
            } catch (error) {
                console.error('Error fetching excursion:', error);
            }
        };

        loadExcursion();
    }, [booking.excursionId]);

    useEffect(() => {
        const targetTime = new Date(booking.eventDate).getTime();

        const countdown = setInterval(() => {
            const currentTime = new Date().getTime();
            const timeLeft = targetTime - currentTime;

            if (timeLeft <= 0) {
                clearInterval(countdown);
                setRemainingTime(0);
            } else {
                setRemainingTime(timeLeft);
            }
        }, 1000);

        return () => {
            clearInterval(countdown);
        };
    }, [booking.eventDate]);

    const formatTime = (time: number) => {
        const hours = Math.floor(time / HOURS);
        const minutes = Math.floor((time % HOURS) / MINUTES);
        const seconds = Math.floor((time % MINUTES) / SECONDS);
        return `${hours}ч ${minutes}м ${seconds}с`;
    };

    const handleDeleteBooking = () => {
        confirmAction(
            'Подтверждение удаления',
            'Вы уверены, что хотите перестать отслеживать бронирование?',
            () => deleteBookingWithNotifications(database, booking.id),
        );
    };

    return {excursion, remainingTime, formatTime, handleDeleteBooking};
};
