import React, {createContext, useEffect, useContext, useState} from 'react';
import Realm from 'realm';
import {useDatabase} from '@/provider/databaseProvider/ui/DatabaseProvider';
import {
    createNotificationChannel,
    requestNotificationPermission,
} from '@/features/notifications';
import { cleanupExpiredBookingsWithNotifications } from '@/features/booking';


const TimeContext = createContext<any>(null);

export const useTime = () => {
    return useContext(TimeContext);
};

const startRealTimeCleanup = (realm: Realm, intervalMs = 60000) => {
    return setInterval(() => {
        cleanupExpiredBookingsWithNotifications(realm);
    }, intervalMs);
};

const stopRealTimeCleanup = (timer: NodeJS.Timeout) => {
    clearInterval(timer);
};

export const TimeProvider = ({children}: {children: React.ReactNode}) => {
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const database = useDatabase();

    useEffect(() => {
        requestNotificationPermission();
        createNotificationChannel();

        const cleanupTimer = startRealTimeCleanup(database);
        setTimer(cleanupTimer);

        return () => {
            if (timer) {
                stopRealTimeCleanup(timer);
            }
        };
    }, []);

    return (
        <TimeContext.Provider
            value={{startRealTimeCleanup, stopRealTimeCleanup}}>
            {children}
        </TimeContext.Provider>
    );
};
