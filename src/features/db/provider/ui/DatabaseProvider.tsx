import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
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
    const [realm, setRealm] = useState<Realm | null>(null);
    useEffect(() => {
        const initializeRealm = async () => {
            const realmInstance = await Realm.open({
                schema: SCHEMAS,
                schemaVersion: SCHEM_VERSION,
            });
            setRealm(realmInstance);
        };

        initializeRealm();

        return () => {
            realm?.close();
        };
    }, []);

    if (!realm) {
        return null;
    }

    return (
        <DatabaseContext.Provider value={realm}>
            {children}
        </DatabaseContext.Provider>
    );
};
