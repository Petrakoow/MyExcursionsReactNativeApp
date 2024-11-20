import {Review} from '@/shared/db/models';
import Realm from 'realm';

export const deleteReview = (realm: Realm, userId: string) => {
    const existingReview = realm.objectForPrimaryKey<Review>(
        Review.schema.name,
        userId,
    );
    if (existingReview) {
        realm.write(() => {
            realm.delete(existingReview);
        });
    }
};
