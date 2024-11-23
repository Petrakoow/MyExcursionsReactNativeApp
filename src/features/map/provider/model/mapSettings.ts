import {
    saveLocationSession,
    getLocationSession,
    defaultSettings,
    LocationSessionType,
} from '@/shared/db/models/map/shared/mapSession';
import {
    requestLocationPermission,
    getCurrentLocation,
    getLocationDetails,
} from '../utils/mapUtils';
import {UNKNOWN} from '@/shared/config/constants';

export const disableAutomaticGeolocation = (): void => {
    const currentSettings = getLocationSession() || defaultSettings;

    const updatedSettings: LocationSessionType = {
        ...currentSettings,
        useNavigation: false,
        geolocation: {
            ...currentSettings.geolocation,
            useAutoGeolocation: false,
        },
        location: {
            city: undefined,
            country: undefined,
        },
    };

    saveLocationSession(updatedSettings);
    console.log('Automatic geolocation disabled.');
};

export const enableAutomaticGeolocation = async (
    onUpdate?: (city: string, country: string) => void,
): Promise<void> => {
    const permissionGranted = await requestLocationPermission();

    if (!permissionGranted) {
        console.warn('Location permission not granted.');
        return;
    }

    getCurrentLocation(
        async (latitude, longitude) => {
            const {city, country} = await getLocationDetails(
                latitude,
                longitude,
            );

            const updatedSettings: LocationSessionType = {
                ...defaultSettings,
                useNavigation: true,
                geolocation: {
                    useAutoGeolocation: true,
                },
                location: {
                    city: city || UNKNOWN,
                    country: country || UNKNOWN,
                },
            };

            saveLocationSession(updatedSettings);

            console.log(
                'Automatic geolocation enabled and updated:',
                updatedSettings,
            );
            if (onUpdate) onUpdate(city || UNKNOWN, country || UNKNOWN);
        },
        error => {
            console.error('Error fetching geolocation:', error);
        },
    );
};

export const setUserGeolocation = (city: string, country: string): void => {
    const currentSettings = getLocationSession() || defaultSettings;

    const updatedSettings: LocationSessionType = {
        ...currentSettings,
        useNavigation: true,
        geolocation: {
            ...currentSettings.geolocation,
            useOwnGeolocation: true,
        },
        location: {
            city: city || UNKNOWN,
            country: country || UNKNOWN,
        },
    };

    saveLocationSession(updatedSettings);
    console.log('User geolocation set:', updatedSettings);
};

export const disableCustomGeolocation = (): void => {
    const currentSettings = getLocationSession() || defaultSettings;

    const updatedSettings: LocationSessionType = {
        ...currentSettings,
        geolocation: {
            ...currentSettings.geolocation,
            useOwnGeolocation: false,
        },
        location: {
            city: undefined,
            country: undefined,
        },
    };

    saveLocationSession(updatedSettings);
    console.log('Custom geolocation disabled.');
};
