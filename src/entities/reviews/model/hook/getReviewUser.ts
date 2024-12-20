import Realm from 'realm';
import {Review, User} from '@/shared/db/models';
import {UNKNOWN_USER} from '@/shared/config/constants';

export const getReviewUser = (
    realm: Realm,
    excursionId: number,
    userId: string,
): (Review & {name: string}) | null => {
    const id = `${userId}-${excursionId}`;
    const review = realm
        .objects<Review>(Review.schema.name)
        .filtered('id == $0', id)[0];

    if (!review?.userId) {
        return null;
    }

    const plainReview = {
        userId: review.userId,
        excursionId: review.excursionId,
        content: review.content,
        rating: review.rating,
        date: review.date,
    };

    const user = realm.objectForPrimaryKey<User>(User.schema.name, userId);
    return {
        ...plainReview,
        name: user?.name || UNKNOWN_USER,
    } as Review & {name: string};
};
