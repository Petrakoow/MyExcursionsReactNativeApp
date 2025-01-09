import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const saveItem = <T>(key: string, value: T): void => {
    try {
        const jsonValue = JSON.stringify(value);
        storage.set(key, jsonValue);
        console.log(`${key} saved successfully`);
    } catch (error) {
        throw new Error(`Error saving ${key}: ${(error as Error).message}`);
    }
};

export const getItem = <T>(key: string): T | null => {
    try {
        const jsonValue = storage.getString(key);
        if (jsonValue) {
            console.log(`${key} retrieved successfully`);
            return JSON.parse(jsonValue) as T;
        }
        return null;
    } catch (error) {
        throw new Error(`Error retrieving ${key}: ${(error as Error).message}`);
    }
};

export const removeItem = (key: string): void => {
    try {
        storage.delete(key);
        console.log(`${key} removed successfully`);
    } catch (error) {
        throw new Error(`Error removing ${key}: ${(error as Error).message}`);
    }
};
