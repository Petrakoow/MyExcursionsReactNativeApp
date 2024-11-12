import AsyncStorage from '@react-native-async-storage/async-storage';
import { RolesEnum } from '@/entities/user/model';

export type UserSessionType = {
    userId: string;
    role: RolesEnum;
};

export const saveUserSession = async (session: UserSessionType) => {
    try {
        await AsyncStorage.setItem('user_session', JSON.stringify(session));
        console.log('Session saved');
    } catch (error) {
        throw new Error(`Error while saving: ${(error as Error).message}`);
    }
};

export const getUserSession = async (): Promise<UserSessionType | null> => {
    try {
        const sessionData = await AsyncStorage.getItem('user_session');
        if (sessionData) {
            console.log('Session found');
            return JSON.parse(sessionData);
        }
        return null;
    } catch (error) {
        throw new Error(`Error while retrieving: ${(error as Error).message}`);
    }
};

export const clearUserSession = async () => {
    try {
        await AsyncStorage.removeItem('user_session');
        console.log('Session cleared');
    } catch (error) {
        throw new Error(`Error while clearing: ${(error as Error).message}`);
    }
};
