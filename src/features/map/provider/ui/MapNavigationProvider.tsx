import React, {
    createContext,
    useEffect,
    useState,
    useContext,
    ReactNode,
} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
    requestLocationPermission,
    getCurrentLocation,
    getLocationDetails,
    loadStoredLocation,
    saveLocation,
} from '../utils/mapUtils';
import {
    clearLocationSession,
    defaultSettings,
    LocationSessionType,
} from '@/shared/db/models/map/shared/mapSession';

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
        const loadLocation = async () => {
            const storedLocation = loadStoredLocation();
            console.log(storedLocation);
            if (storedLocation) {
                setLocation(storedLocation);
                console.log(storedLocation);
            } else {
                const permissionGranted = await requestLocationPermission();
                if (permissionGranted) {
                    setAccessAllowed(true);
                    fetchLocation();
                } else {
                    setAccessAllowed(false);
                }
            }
        };

        loadLocation();
    }, []);

    const fetchLocation = () => {
        getCurrentLocation(
            async (latitude, longitude) => {
                const {city, country} = await getLocationDetails(
                    latitude,
                    longitude,
                );
                const updateSettings: LocationSessionType = {
                    ...defaultSettings,
                    useNavigation: true,
                    geolocation: {
                        useCityForAutoGeolocation: true,
                        useCountryForAutoGeolocation: true,
                    },
                    location: {
                        city: city,
                        country: country,
                    },
                };
                setLocation(updateSettings);
                saveLocation(updateSettings);
            },
            error => {
                console.error('Location fetch error:', error);
            },
        );
    };

    return (
        <LocationContext.Provider value={{...location, accessAllowed}}>
            {children}
        </LocationContext.Provider>
    );
};
