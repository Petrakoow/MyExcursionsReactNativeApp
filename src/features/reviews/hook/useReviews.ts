import {useState, useEffect} from 'react';
import {useDatabase} from '@/app/providers';
import {Review} from '@/shared/db/models';
import {
    addReview,
    deleteReview,
    getReviews,
    getReviewUser,
    updateReview,
} from '@/entities/reviews';
import {UserBasicFieldType} from '@/shared/db/models/user';
import {getUser} from '@/entities/user/model';
import {formatDate} from '@/shared/utils';

export const useReviews = (uid: number, user: UserBasicFieldType) => {
    const [reviews, setReviews] = useState<(Review & {name: string})[]>([]);
    const [existingReview, setExistingReview] = useState<
        (Review & {name: string}) | null
    >(null);
    const [initials, setInitials] = useState('');
    const database = useDatabase();

    useEffect(() => {
        setInitials(getUser(database, user.userId)?.name || '');

        const reviewsCollection = database
            .objects<Review>(Review.schema.name)
            .filtered('excursionId == $0', uid);

        const handleReviewsChange = () => {
            
            const updatedReviews = getReviews(database, uid) || [];
            setReviews(updatedReviews);
            console.log('sdfsd');
            const userReview =
                getReviewUser(database, uid, user.userId) || null;
            setExistingReview(userReview);
        };

        reviewsCollection.addListener(handleReviewsChange);
        return () => {
            reviewsCollection.removeListener(handleReviewsChange);
        };
    }, [uid, user.userId, database]);

    const addOrUpdate = (rating: number, text: string) => {
        try {
            if (existingReview) {
                updateReview(database, user.userId, uid, {
                    rating: rating,
                    content: text,
                    date: formatDate(new Date()),
                });
            } else {
                addReview(database, {
                    userId: user.userId,
                    excursionId: uid,
                    rating: rating,
                    content: text,
                });
            }
        } catch (error) {
            console.error('Error adding/updating review:', error);
        }
    };

    const remove = () => {
        try {
            if (existingReview) {
                deleteReview(database, user.userId, uid);
            }
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return {reviews, existingReview, addOrUpdate, remove};
};
