import Realm from 'realm';
import {User} from '@/shared/db/models';

export const addUser = async (realm: Realm, userData: Partial<User>) => {
    realm.write(() => {
        realm.create(User.schema.name, {
            userId: userData.userId,
            username: userData.username,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            profileIcon: userData.profileIcon || null,
            country: userData.country || null,
            phoneNumber: userData.phoneNumber || null,
            profileSignature: userData.profileSignature || null,
        });
    });
};
