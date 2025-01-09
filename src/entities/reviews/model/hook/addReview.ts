import {Review} from '@/shared/db/models';
import Realm from 'realm';

export const addReview = (realm: Realm, reviewData: Partial<Review>) => {
    const id = `${reviewData.userId}-${reviewData.excursionId}`;
    realm.write(() => {
        realm.create(Review.schema.name, {
            id,
            userId: reviewData.userId,
            excursionId: reviewData.excursionId,
            rating: reviewData.rating || 1,
            content: reviewData.content || '',
            date: new Date(),
        });
    });
};
