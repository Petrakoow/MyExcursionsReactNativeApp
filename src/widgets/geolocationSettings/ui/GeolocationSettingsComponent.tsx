import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {CustomText} from '@/shared/ui/customText';
import {ToggleButton} from '@/shared/ui/toggleButton';

import {UNKNOWN} from '@/shared/config/constants';
import {getLocationSession} from '@/shared/db/models/map';
import {
    disableAutomaticGeolocation,
    enableAutomaticGeolocation,
} from '@/features/map';
import {palette} from '@/shared/config/colors';
import {TextSize, TextWeight} from '@/shared/config/font';

export const GeolocationSettingsComponent = () => {
    const [useAutoGeolocation, setUseAutoGeolocation] = useState(false);
    const [city, setCity] = useState<string | undefined>(undefined);
    const [country, setCountry] = useState<string | undefined>(undefined);

    useEffect(() => {
        const currentSettings = getLocationSession();
        if (currentSettings) {
            setUseAutoGeolocation(currentSettings.useAutoGeolocation || false);
            setCity(currentSettings.location.city);
            setCountry(currentSettings.location.country);
        }
    }, []);

    const handleToggleAutoGeolocation = async () => {
        if (useAutoGeolocation) {
            disableAutomaticGeolocation();
            Alert.alert(
                'Геолокация была выключена',
                'Автоматическая геолокация выключена',
            );
            setCity(undefined);
            setCountry(undefined);
        } else {
            await enableAutomaticGeolocation((newCity, newCountry) => {
                setCity(newCity);
                setCountry(newCountry);
            });
            Alert.alert(
                'Геолокация включена',
                'Автоматическая геолокация была включена',
            );
        }
        setUseAutoGeolocation(!useAutoGeolocation);
    };

    return (
        <View style={styles.container}>
            <CustomText
                style={styles.title}
                size={TextSize.S_BASE}
                weight={TextWeight.BOLD}
            >
                Настройки геолокации
            </CustomText>

            <View style={styles.toggleContainer}>
                <CustomText>Включить автоматическую навигацию</CustomText>
                <ToggleButton
                    inactiveColor={palette.light.textSecondary}
                    isActive={useAutoGeolocation}
                    onPress={handleToggleAutoGeolocation}
                    style={{padding: 10}}
                />
            </View>

            <View style={styles.locationInfo}>
                <CustomText>Использовать город: {city || UNKNOWN}</CustomText>
                <CustomText>Использовать страну: {country || UNKNOWN}</CustomText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    title: {
        marginBottom: 16,
        textAlign: 'center',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    locationInfo: {
        marginTop: 16,
    },
});
