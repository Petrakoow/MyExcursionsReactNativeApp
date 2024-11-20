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

export const useReviews = (uid: number, userId: string) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [existingReview, setExistingReview] = useState<Review | undefined>(
        undefined,
    );
    const database = useDatabase();

    useEffect(() => {
        const allReviews = getReviews(database, uid) || [];
        const userReview = getReviewUser(database, uid, userId) || undefined;
        setReviews(allReviews);
        setExistingReview(userReview);
    }, [uid, userId]);

    const addOrUpdate = (rating: number, text: string) => {
        try {
            if (existingReview) {
                updateReview(database, userId, uid, rating, text);
            } else {
                addReview(database, userId, uid, 'AA', rating, text);
            }
            const userReview = getReviewUser(database, uid, userId);
            if (userReview) {
                setReviews(getReviews(database, uid));
                setExistingReview(userReview);
            }
        } catch (error) {
            console.error('Error adding/updating review:', error);
        }
    };

    const remove = () => {
        try {
            if (existingReview) {
                deleteReview(database, userId, uid);
                setReviews(getReviews(database, uid));
                setExistingReview(undefined);
            }
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return {reviews, existingReview, addOrUpdate, remove};
};
