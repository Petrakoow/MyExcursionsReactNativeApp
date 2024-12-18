import {saveItem, getItem, removeItem} from '@/shared/db/utils';

export type LocationSessionType = {
    useNavigation: boolean;
    geolocation: {
        useOwnGeolocation?: boolean;
        useAutoGeolocation?: boolean;
    };
    location: {
        city?: string;
        country?: string;
    };
};

export const defaultSettings: LocationSessionType = {
    useNavigation: false,
    geolocation: {
        useAutoGeolocation: false,
        useOwnGeolocation: false,
    },
    location: {
        city: undefined,
        country: undefined,
    },
};

const LOCATION_SESSION_KEY = 'location_session';

export const saveLocationSession = (location: LocationSessionType): void => {
    saveItem<LocationSessionType>(LOCATION_SESSION_KEY, location);
};

export const getLocationSession = (): LocationSessionType | null => {
    return getItem<LocationSessionType>(LOCATION_SESSION_KEY);
};

export const clearLocationSession = (): void => {
    removeItem(LOCATION_SESSION_KEY);
};
