import {Review} from '@/shared/db/models';
import Realm from 'realm';

export const deleteAllReviews = (realm: Realm, userId: string) => {
    const userReviews = realm
        .objects<Review>(Review.schema.name)
        .filtered('userId == $0', userId);

    if (userReviews.length > 0) {
        realm.write(() => {
            realm.delete(userReviews);
        });
    }
};
