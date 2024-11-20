import React, {useState, useEffect} from 'react';
import {BottomPanel} from '@/shared/ui/bottomPanel';
import * as Icons from '@/shared/assets/icons';
import {TourTypeRequest} from '@/shared/api/sputnik8';
import {BookingModal} from '@/widgets/excursionModalWindow';
import {View} from 'react-native';
import {
    addToFavorites,
    isFavorite,
    removeFromFavorites,
} from '@/entities/excursion';
import {useDatabase} from '@/app/providers';
import {getUserSession} from '@/shared/db/models/user';
import {palette} from '@/shared/config/colors';

type BottomExcursionPanelProps = {
    orderOptions: TourTypeRequest['order_options'];
    onToggleReviews: () => void;
    isReviewsVisible: boolean;
    excursionId: number;
};

export const BottomExcursionPanel = ({
    orderOptions,
    onToggleReviews,
    isReviewsVisible,
    excursionId,
}: BottomExcursionPanelProps) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isBookingModalVisible, setBookingModalVisible] = useState(false);
    const [isFavoriteExcursion, setIsFavoriteExcursion] = useState(false);

    const database = useDatabase();

    useEffect(() => {
        const fetchUserSession = async () => {
            try {
                const session = await getUserSession();
                if (session?.userId) {
                    setUserId(session.userId);
                } else {
                    console.error('User session not found.');
                }
            } catch (error) {
                console.error('Error retrieving user session:', error);
            }
        };
        fetchUserSession();
    }, []);

    useEffect(() => {
        if (!userId) return;

        const fetchFavoriteStatus = async () => {
            const favoriteStatus = await isFavorite(
                database,
                excursionId,
                userId,
            );
            setIsFavoriteExcursion(favoriteStatus);
        };
        fetchFavoriteStatus();
    }, [excursionId, userId]);

    const handleFavoriteToggle = async () => {
        if (!userId) {
            console.error('Cannot toggle favorite: userId is not available.');
            return;
        }

        if (isFavoriteExcursion) {
            await removeFromFavorites(database, excursionId, userId);
        } else {
            await addToFavorites(database, excursionId, userId);
        }
        setIsFavoriteExcursion(!isFavoriteExcursion);
    };

    return (
        <View>
            <BottomPanel>
                <BottomPanel.Button
                    title={isFavoriteExcursion ? 'Удалить' : 'Добавить'}
                    Icon={Icons.FavouriteExcursionAction}
                    onPress={handleFavoriteToggle}
                />
                <BottomPanel.Button
                    title="Бронь"
                    Icon={Icons.BookingExcursionAction}
                    onPress={() => setBookingModalVisible(true)}
                />
                <BottomPanel.Button
                    title="Отзывы"
                    Icon={Icons.ReviewsExcursionAction}
                    onPress={onToggleReviews}
                    color={
                        isReviewsVisible
                            ? palette.light.warning
                            : palette.light.background
                    }
                />
            </BottomPanel>
            <BookingModal
                orderOptions={orderOptions}
                visible={isBookingModalVisible}
                onClose={() => setBookingModalVisible(false)}
                animationType="fade"
            />
        </View>
    );
};
