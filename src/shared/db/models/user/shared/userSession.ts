import {RolesEnum} from '@/entities/user/model';
import {saveItem, getItem} from '@/shared/db/utils';

export type UserBasicFieldType = {
    userId: string;
    username?: string;
};

export type UserSessionType = UserBasicFieldType & {
    role: RolesEnum;
};

const USER_SESSION_KEY = 'user_session';

export const saveUserSession = (session: UserSessionType): void => {
    saveItem<UserSessionType>(USER_SESSION_KEY, session);
};

export const getUserSession = (): UserSessionType | null => {
    return getItem<UserSessionType>(USER_SESSION_KEY);
};
