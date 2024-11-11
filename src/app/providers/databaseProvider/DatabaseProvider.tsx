import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import {Database} from '@nozbe/watermelondb';
import {getDatabase} from '@/shared/db';

const DatabaseContext = createContext<Database | null>(null);

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error('useDatabase must be used within a DatabaseProvider');
    }
    return context;
};

export const DatabaseProvider = ({children}: {children: ReactNode}) => {
    const [database, setDatabase] = useState<Database | null>(null);
    useEffect(() => {
        setDatabase(getDatabase());
    }, []);

    if (!database) {
        return null;
    }

    return (
        <DatabaseContext.Provider value={database}>
            {children}
        </DatabaseContext.Provider>
    );
};
