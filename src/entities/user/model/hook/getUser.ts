import Realm from 'realm';
import {User} from '@/shared/db/models';

export const getUser = (realm: Realm, userId: string): User | undefined => {
    return realm.objectForPrimaryKey(User, userId) || undefined;
};
