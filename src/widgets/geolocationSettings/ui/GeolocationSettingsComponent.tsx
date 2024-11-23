import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {CustomText} from '@/shared/ui/customText';
import {ToggleButton} from '@/shared/ui/toggleButton';

import {UNKNOWN} from '@/shared/config/constants';
import {getLocationSession} from '@/shared/db/models/map';
import {
    disableAutomaticGeolocation,
    disableCustomGeolocation,
    enableAutomaticGeolocation,
    setUserGeolocation,
} from '@/features/map';

export const GeolocationSettingsComponent = () => {
    const [useAutoGeolocation, setUseAutoGeolocation] = useState(false);
    const [useCustomGeolocation, setUseCustomGeolocation] = useState(false);
    const [city, setCity] = useState<string | undefined>(undefined);
    const [country, setCountry] = useState<string | undefined>(undefined);

    useEffect(() => {
        const currentSettings = getLocationSession();
        if (currentSettings) {
            setUseAutoGeolocation(
                currentSettings.geolocation.useAutoGeolocation || false,
            );
            setUseCustomGeolocation(
                currentSettings.geolocation.useOwnGeolocation || false,
            );
            setCity(currentSettings.location.city);
            setCountry(currentSettings.location.country);
        }
    }, []);

    const handleToggleAutoGeolocation = async () => {
        if (useAutoGeolocation) {
            disableAutomaticGeolocation();
            Alert.alert(
                'Geolocation Disabled',
                'Automatic geolocation has been disabled.',
            );
            setCity(undefined);
            setCountry(undefined);
        } else {
            getAutomaticGeolocation();
            Alert.alert(
                'Geolocation Enabled',
                'Automatic geolocation has been enabled.',
            );
        }
        setUseAutoGeolocation(!useAutoGeolocation);
    };

    const handleToggleCustomGeolocation = () => {
        if (useCustomGeolocation) {
            disableCustomGeolocation();
            Alert.alert(
                'Custom Geolocation Disabled',
                'Custom city and country selection disabled.',
            );
            if (useAutoGeolocation) {
                getAutomaticGeolocation();
            } else {
                setCity(undefined);
                setCountry(undefined);
            }
        } else {
            setUserGeolocation(UNKNOWN, UNKNOWN);
            setCity(undefined);
            setCountry(undefined);
            Alert.alert(
                'Custom Geolocation Enabled',
                'You can now set a custom city and country.',
            );
        }
        setUseCustomGeolocation(!useCustomGeolocation);
    };

    const getAutomaticGeolocation = async () => {
        await enableAutomaticGeolocation((newCity, newCountry) => {
            setCity(newCity);
            setCountry(newCountry);
        });
    };

    return (
        <View style={styles.container}>
            <CustomText style={styles.title}>Geolocation Settings</CustomText>

            <View style={styles.toggleContainer}>
                <CustomText style={styles.toggleLabel}>
                    Enable Automatic Geolocation
                </CustomText>
                <ToggleButton
                    isActive={useAutoGeolocation}
                    onPress={handleToggleAutoGeolocation}
                    style={{backgroundColor: '#000', padding: 10}}
                />
            </View>

            <View style={styles.toggleContainer}>
                <CustomText style={styles.toggleLabel}>
                    Enable Custom Geolocation
                </CustomText>
                <ToggleButton
                    isActive={useCustomGeolocation}
                    onPress={handleToggleCustomGeolocation}
                    style={{backgroundColor: '#000', padding: 10}}
                />
            </View>

            <View style={styles.locationInfo}>
                <CustomText style={styles.infoText}>
                    Current City: {city || UNKNOWN}
                </CustomText>
                <CustomText style={styles.infoText}>
                    Current Country: {country || UNKNOWN}
                </CustomText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    toggleLabel: {
        fontSize: 16,
        color: '#333',
    },
    locationInfo: {
        marginTop: 16,
    },
    infoText: {
        fontSize: 14,
        color: '#555',
    },
});
