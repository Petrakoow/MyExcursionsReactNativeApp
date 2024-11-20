import {RolesEnum} from '@/entities/user/model';
import {saveItem, getItem, removeItem} from '@/shared/db/utils';

export type UserBasicFieldType = {
    userId: string;
    username: string;
};

export type UserSessionType = UserBasicFieldType & {
    role: RolesEnum;
};

const USER_SESSION_KEY = 'user_session';

export const saveUserSession = async (session: UserSessionType) => {
    await saveItem<UserSessionType>(USER_SESSION_KEY, session);
};

export const getUserSession = async (): Promise<UserSessionType | null> => {
    return await getItem<UserSessionType>(USER_SESSION_KEY);
};

export const clearUserSession = async () => {
    await removeItem(USER_SESSION_KEY);
};
