import {useState, useEffect} from 'react';
import {Review} from '@/shared/db/models';
import {fetchTourInfo} from '@/entities/api';
import {getReviewsByUser} from '@/entities/reviews/model/hook/getReviewsUser';
import {TourTypeRequest} from '@/shared/api';
import Realm from 'realm';
import {deleteReview} from '@/entities/reviews';
import {confirmAction} from '@/shared/utils';
import {deleteAllReviews} from '@/entities/reviews/model/hook/deleteAllReviews';

export const useUserReview = (userId: string | undefined, realm: Realm) => {
    const [reviews, setReviews] = useState<TourTypeRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);

    const handleDeleteComment = (excursionId: number) => {
        if (userId) {
            confirmAction(
                'Подтверждение удаления',
                'Вы уверены, что хотите удалить комментарий? Это действие невозможно отменить.',
                () => deleteReview(realm, userId, excursionId),
            );
        }
    };

    const handleDeleteAllComments = () => {
        if (userId) {
            confirmAction(
                'Подтверждение удаления',
                'Вы уверены, что хотите удалить все комментарии? Это действие невозможно отменить.',
                () => deleteAllReviews(realm, userId),
            );
        }
    };

    useEffect(() => {
        if (!userId) return;

        const fetchExcursionData = async (userReviews: Review[]) => {
            setIsLoading(true);

            try {
                const toursData = await Promise.all(
                    userReviews.map(async review => {
                        const tourInfo = await fetchTourInfo(
                            review.excursionId,
                        );
                        return tourInfo;
                    }),
                );

                setReviews(toursData);
            } catch (error) {
                setIsError('Не удалось загрузить комментарии');
            } finally {
                setIsLoading(false);
            }
        };

        const userReviews = getReviewsByUser(realm, userId);

        const listener = () => {
            fetchExcursionData([...userReviews]);
        };

        fetchExcursionData([...userReviews]);

        userReviews.addListener(listener);

        return () => {
            userReviews.removeListener(listener);
        };
    }, [userId, realm]);

    return {
        reviews,
        isLoading,
        isError,
        handleDeleteComment,
        handleDeleteAllComments,
    };
};
