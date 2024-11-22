import { Review, User } from '@/shared/db/models';
import Realm from 'realm';
import { UNKNOWN_USER } from '@/shared/config/constants';

export const getReviews = (
    realm: Realm,
    excursionId: number,
): (Review & { name: string })[] => {
    const reviews = realm
        .objects<Review>(Review.schema.name)
        .filtered('excursionId == $0', excursionId);

    return reviews.map(review => {
        const plainReview = {
            userId: review.userId,
            excursionId: review.excursionId,
            content: review.content,
            rating: review.rating,
            date: review.date,
        };

        const user = realm.objectForPrimaryKey<User>(
            User.schema.name,
            review.userId,
        );

        return {
            ...plainReview,
            name: user?.name || UNKNOWN_USER,
        } as Review & { name: string };
    });
};
