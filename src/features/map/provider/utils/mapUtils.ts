import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {geoCoderRequest, params} from '@/shared/config/api/yandex';
import {
    saveLocationSession,
    getLocationSession,
    LocationSessionType,
    defaultSettings,
} from '@/shared/db/models/map';
import {UNKNOWN} from '@/shared/config/constants';

export const requestLocationPermission = async (): Promise<boolean> => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );

            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
            return true; // On iOS (не реализовал)
        }
    } catch (err) {
        console.error('Error requesting location permission:', err);
        return false;
    }
};

export const getCurrentLocation = (
    onSuccess: (latitude: number, longitude: number) => void,
    onError: (error: any) => void,
) => {
    Geolocation.getCurrentPosition(
        position => {
            const {latitude, longitude} = position.coords;
            onSuccess(latitude, longitude);
        },
        error => {
            console.error('Error getting location:', error);
            onError(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
};

export const getLocationDetails = async (
    latitude: number,
    longitude: number,
): Promise<{city: string; country: string}> => {
    try {
        const response = await axios.get(geoCoderRequest(longitude, latitude));

        const components =
            response.data.response.GeoObjectCollection.featureMember[0]
                ?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address
                ?.Components;

        const city = components
            ?.find((component: any) => component.kind === params.locality)
            ?.name.replace('город ', '');
        const country = components?.find(
            (component: any) => component.kind === params.country,
        )?.name;

        return {city: city || UNKNOWN, country: country || UNKNOWN};
    } catch (err) {
        console.error('Error fetching location details from Yandex:', err);
        return {city: UNKNOWN, country: UNKNOWN};
    }
};

export const loadStoredLocation = () => {
    return getLocationSession();
};

export const saveLocation = (props: LocationSessionType) => {
    saveLocationSession(props);
};

export const updateGeolocationSettings = (props: LocationSessionType) => {
    const locationSettings: LocationSessionType =
        getLocationSession() || defaultSettings;

    const updatedSettings = {
        ...locationSettings,
        ...props,
    };

    saveLocationSession(updatedSettings);
};
