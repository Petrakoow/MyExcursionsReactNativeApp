import Realm from 'realm';
import {User} from '@/shared/db/models';

export const updateUser = (
    realm: Realm,
    userId: string,
    updates: Partial<User>,
) => {
    const user = realm.objectForPrimaryKey(User, userId);
    if (user) {
        realm.write(() => {
            Object.assign(user, updates);
        });
    }
};
