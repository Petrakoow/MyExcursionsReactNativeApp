import {
    saveLocationSession,
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
    const updatedSettings: LocationSessionType = {
        ...defaultSettings,
        useAutoGeolocation: false,
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
                useAutoGeolocation: true,
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
            if (onUpdate) {
                onUpdate(city || UNKNOWN, country || UNKNOWN);
            }
        },
        error => {
            console.error('Error fetching geolocation:', error);
        },
    );
};
