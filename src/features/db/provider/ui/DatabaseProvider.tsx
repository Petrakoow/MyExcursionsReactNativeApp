import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
} from 'react';
import Realm from 'realm';
import {SCHEMAS, SCHEM_VERSION} from '@/shared/db';
const DatabaseContext = createContext<Realm | null>(null);

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error('useDatabase must be used within a DatabaseProvider');
    }
    return context;
};

export const DatabaseProvider = ({children}: {children: ReactNode}) => {
    const realmRef = useRef<Realm | null>(null);
    useEffect(() => {
        const initializeRealm = async () => {
            const realmInstance = await Realm.open({
                schema: SCHEMAS,
                schemaVersion: SCHEM_VERSION,
            });
            realmRef.current = realmInstance;
        };

        initializeRealm();

        return () => {
            realmRef.current?.close();
        };
    }, []);

    if (!realmRef.current) {
        return null;
    }

    return (
        <DatabaseContext.Provider value={realmRef.current}>
            {children}
        </DatabaseContext.Provider>
    );
};
