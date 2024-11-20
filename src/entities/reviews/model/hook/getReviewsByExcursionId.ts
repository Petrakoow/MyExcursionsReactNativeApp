import {Review} from '@/shared/db/models';
import Realm from 'realm';

export const getReviews = (realm: Realm, excursionId: number): Review[] => {
    return realm
        .objects<Review>(Review.schema.name)
        .filtered(`excursionId == $0`, excursionId)
        .slice();
};
