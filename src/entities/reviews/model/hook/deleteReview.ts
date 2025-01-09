import {Review} from '@/shared/db/models';
import Realm from 'realm';

export const deleteReview = (
    realm: Realm,
    userId: string,
    excursionId: number,
) => {
    const id = `${userId}-${excursionId}`;
    const existingReview = realm
        .objects<Review>(Review.schema.name)
        .filtered('id == $0', id)[0];
    if (existingReview) {
        realm.write(() => {
            realm.delete(existingReview);
        });
    }
};
