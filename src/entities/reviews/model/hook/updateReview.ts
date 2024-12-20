import {Review} from '@/shared/db/models';
import Realm from 'realm';

export const updateReview = (
    realm: Realm,
    userId: string,
    excursionId: number,
    updateData: Partial<Review>,
) => {
    const id = `${userId}-${excursionId}`;
    const existingReview = realm
        .objects<Review>(Review.schema.name)
        .filtered('id == $0', id)[0];
    if (existingReview) {
        realm.write(() => {
            Object.assign(existingReview, updateData);
        });
    }
};
