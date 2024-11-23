import React, {
    createContext,
    useEffect,
    useState,
    useContext,
    ReactNode,
} from 'react';
import {requestLocationPermission} from '../utils/mapUtils';
import {
    defaultSettings,
    getLocationSession,
    LocationSessionType,
} from '@/shared/db/models/map/shared/mapSession';
import {
    disableAutomaticGeolocation,
    enableAutomaticGeolocation,
} from '../model/mapSettings';

const LocationContext = createContext<{
    city?: string;
    country?: string;
    accessAllowed?: boolean;
}>({
    city: undefined,
    country: undefined,
    accessAllowed: false,
});

export const useLocation = () => useContext(LocationContext);

type MapNavigationProviderType = {
    children: ReactNode;
};

export const MapNavigationProvider = ({
    children,
}: MapNavigationProviderType) => {
    const [location, setLocation] =
        useState<LocationSessionType>(defaultSettings);
    const [accessAllowed, setAccessAllowed] = useState<boolean>(false);

    useEffect(() => {
        const initializeLocation = async () => {
            const storedSettings = getLocationSession() || defaultSettings;

            if (!storedSettings.useNavigation) {
                console.log('Navigation disabled.');
                disableAutomaticGeolocation();
                return;
            }

            if (storedSettings.geolocation.useOwnGeolocation) {
                console.log(
                    'Using user-provided geolocation:',
                    storedSettings.location,
                );
                setLocation(storedSettings);
                return;
            }

            const permissionGranted = await requestLocationPermission();
            if (permissionGranted) {
                setAccessAllowed(true);
                await enableAutomaticGeolocation();
                const updatedLocation = getLocationSession();
                if (updatedLocation) {
                    setLocation(updatedLocation);
                }
            } else {
                setAccessAllowed(false);
            }
        };

        initializeLocation();
    }, []);

    return (
        <LocationContext.Provider value={{...location, accessAllowed}}>
            {children}
        </LocationContext.Provider>
    );
};
