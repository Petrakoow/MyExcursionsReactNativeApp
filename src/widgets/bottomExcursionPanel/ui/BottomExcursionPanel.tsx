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
import {useDatabase} from '@/features/db/provider';
import {getUserSession} from '@/shared/db/models/user';
import {palette} from '@/shared/config/colors';

type BottomExcursionPanelProps = {
    orderOptions: TourTypeRequest['order_options'];
    onToggleReviews: () => void;
    isReviewsVisible: boolean;
    excursionId: number;
};

// переписать

export const BottomExcursionPanel = ({
    orderOptions,
    onToggleReviews,
    isReviewsVisible,
    excursionId,
}: BottomExcursionPanelProps) => {
    const [isBookingModalVisible, setBookingModalVisible] = useState(false);
    const [isFavoriteExcursion, setIsFavoriteExcursion] = useState(false);

    const database = useDatabase();
    const userId = getUserSession()?.userId;

    useEffect(() => {
        if (!userId) return;

        const favoriteStatus = isFavorite(database, excursionId, userId);
        setIsFavoriteExcursion(favoriteStatus);
    }, [excursionId, userId]);

    const handleFavoriteToggle = () => {
        if (!userId) return;
        if (isFavoriteExcursion) {
            removeFromFavorites(database, excursionId, userId);
        } else {
            addToFavorites(database, excursionId, userId);
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
