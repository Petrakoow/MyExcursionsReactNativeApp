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
import {UNAUTHORIZED_USER} from '@/shared/config/constants';

export const useReviews = (uid: number, user: UserBasicFieldType) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [existingReview, setExistingReview] = useState<Review | undefined>(
        undefined,
    );
    const [initials, setInitials] = useState('');
    const database = useDatabase();

    useEffect(() => {
        const allReviews = getReviews(database, uid) || [];
        const userReview =
            getReviewUser(database, uid, user.userId) || undefined;
        setInitials(getUser(database, user.userId)?.name || '');
        setReviews(allReviews);
        setExistingReview(userReview);
    }, [uid, user.userId]);

    const addOrUpdate = (rating: number, text: string) => {
        try {
            if (existingReview) {
                updateReview(database, user.userId, uid, rating, text);
            } else {
                addReview(
                    database,
                    user.userId,
                    uid,
                    initials ? initials : user.username || UNAUTHORIZED_USER,
                    rating,
                    text,
                );
            }
            const userReview = getReviewUser(database, uid, user.userId);
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
                deleteReview(database, user.userId, uid);
                setReviews(getReviews(database, uid));
                setExistingReview(undefined);
            }
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return {reviews, existingReview, addOrUpdate, remove};
};
