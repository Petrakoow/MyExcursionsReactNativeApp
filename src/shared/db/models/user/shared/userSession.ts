import {RolesEnum} from '@/entities/user/model';
import {Database} from '@nozbe/watermelondb';

export type UserSessionType = {
    userId: string;
    role: RolesEnum;
};

export const saveUserSession = async (
    database: Database,
    session: UserSessionType,
) => {
    try {
        await database.localStorage.set(
            'user_session',
            JSON.stringify(session),
        );
        console.log('Session saved');
    } catch (error) {
        throw new Error(`Error while saving: ${(error as Error).message}`);
    }
};

export const getUserSession = async (
    database: Database,
): Promise<UserSessionType | null> => {
    try {
        const sessionData = (await database.localStorage.get(
            'user_session',
        )) as string;
        if (sessionData) {
            console.log('Session found');
            return JSON.parse(sessionData);
        }
        return null;
    } catch (error) {
        throw new Error(`Error while receiving: ${(error as Error).message}`);
    }
};

export const clearUserSession = async (database: Database) => {
    try {
        await database.localStorage.remove('user_session');
        console.log('session cleared');
    } catch (error) {
        throw new Error(`Error while clearing: ${(error as Error).message}`);
    }
};
