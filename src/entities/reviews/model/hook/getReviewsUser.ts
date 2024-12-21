import {Review} from '@/shared/db/models';
import Realm from 'realm';

export const getReviewsByUser = (realm: Realm, userId: string) => {
    return realm
        .objects<Review>(Review.schema.name)
        .filtered('userId == $0', userId);
};
