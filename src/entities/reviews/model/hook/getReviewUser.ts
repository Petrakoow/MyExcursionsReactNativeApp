import Realm from 'realm';
import {Review} from '@/shared/db/models';

export const getReviewUser = (
    realm: Realm,
    excursionId: number,
    userId: string,
): Review => {
    const record = realm
        .objects<Review>(Review.schema.name)
        .filtered('userId == $0 AND excursionId == $1', userId, excursionId)[0];

    return record;
};
