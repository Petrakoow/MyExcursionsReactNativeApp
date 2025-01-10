import Realm from 'realm';
import {Status} from '@/shared/db/models';

export const userStatus = (realm: Realm, userId: string) => {
    realm.write(() => {
        let status = realm.objectForPrimaryKey<Status>(
            Status.schema.name,
            userId,
        );
        if (!status) {
            realm.create(Status.schema.name, {
                userId,
                isVerified: true,
            });
        }
    });
};

export const checkStatus = (realm: Realm, userId: string): boolean => {
    const status = realm.objectForPrimaryKey<Status>(
        Status.schema.name,
        userId,
    );
    return status?.isVerified || false;
};

export const deleteUserStatus = (realm: Realm, userId: string): void => {
    const status = realm.objectForPrimaryKey<Status>(
        Status.schema.name,
        userId,
    );

    if (status) {
        realm.write(() => {
            realm.delete(status); // Delete the status entry for the user
        });
    }
};
