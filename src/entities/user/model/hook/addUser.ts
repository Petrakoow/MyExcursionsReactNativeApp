import Realm from 'realm';
import {RolesEnum} from '@/entities/user/model';
import { User } from '@/shared/db/models';

export const addUser = async (
    realm: Realm,
    userId: string,
    username: string,
    name: string,
    email: string,
    role: RolesEnum,
) => {
    const convertedRole = role.toString();
    realm.write(() => {
        realm.create(User.schema.name, {
            userId,
            username,
            email,
            name,
            role: convertedRole,
            profileIcon: null,
            country: null,
            phoneNumber: null,
            profileSignature: null,
        });
    });
};
