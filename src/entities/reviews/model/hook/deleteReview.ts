import {Review} from '@/shared/db/models';
import Realm from 'realm';

export const deleteReview = (
    realm: Realm,
    userId: string,
    excursionId: number,
) => {
    const existingReview = realm
        .objects<Review>(Review.schema.name)
        .filtered('userId == $0 AND excursionId == $1', userId, excursionId)[0];
    if (existingReview) {
        realm.write(() => {
            realm.delete(existingReview);
        });
    }
};
