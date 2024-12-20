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
    useAutoGeolocation: boolean;
}>(defaultSettings);

export const useLocation = () => useContext(LocationContext);

type MapNavigationProviderType = {
    children: ReactNode;
};

export const MapNavigationProvider = ({
    children,
}: MapNavigationProviderType) => {
    const [location, setLocation] =
        useState<LocationSessionType>(defaultSettings);

    useEffect(() => {
        const initializeLocation = async () => {
            const storedSettings = getLocationSession() || defaultSettings;

            if (!storedSettings.useAutoGeolocation) {
                console.log('Automatic geolocation disabled.');
                disableAutomaticGeolocation();
                setLocation(storedSettings);
                return;
            }

            const permissionGranted = await requestLocationPermission();
            if (permissionGranted) {
                await enableAutomaticGeolocation((city, country) => {
                    setLocation({
                        useAutoGeolocation: true,
                        location: {city, country},
                    });
                });
            } else {
                setLocation({
                    useAutoGeolocation: false,
                    location: {city: undefined, country: undefined},
                });
            }
        };

        initializeLocation();
    }, []);

    return (
        <LocationContext.Provider value={location}>
            {children}
        </LocationContext.Provider>
    );
};
