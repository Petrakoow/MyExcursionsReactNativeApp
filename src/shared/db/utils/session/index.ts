import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItem = async <T>(key: string, value: T): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        console.log(`${key} saved successfully`);
    } catch (error) {
        throw new Error(`Error saving ${key}: ${(error as Error).message}`);
    }
};

export const getItem = async <T>(key: string): Promise<T | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue) {
            console.log(`${key} retrieved successfully`);
            return JSON.parse(jsonValue) as T;
        }
        return null;
    } catch (error) {
        throw new Error(`Error retrieving ${key}: ${(error as Error).message}`);
    }
};

export const removeItem = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
        console.log(`${key} removed successfully`);
    } catch (error) {
        throw new Error(`Error removing ${key}: ${(error as Error).message}`);
    }
};
