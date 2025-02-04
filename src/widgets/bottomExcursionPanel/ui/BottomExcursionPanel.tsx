import React, {useState, useEffect} from 'react';
import {BottomPanel} from '@/shared/ui/bottomPanel';
import * as Icons from '@/shared/assets/icons';
import {TourTypeRequest} from '@/shared/api';
import {BookingModal} from '@/widgets/excursionModalWindow';
import {View} from 'react-native';
import {
    addToFavorites,
    isFavorite,
    removeFromFavorites,
} from '@/entities/excursion';
import {getUserSession, getUserStatus} from '@/shared/db/models/user';
import {palette} from '@/shared/config/colors';
import {useDatabase} from '@/provider';

type BottomExcursionPanelProps = {
    options: TourTypeRequest;
    onToggleReviews: () => void;
    isReviewsVisible: boolean;
    excursionId: number;
};

export const BottomExcursionPanel = ({
    options,
    onToggleReviews,
    isReviewsVisible,
    excursionId,
}: BottomExcursionPanelProps) => {
    const [isBookingModalVisible, setBookingModalVisible] = useState(false);
    const [isFavoriteExcursion, setIsFavoriteExcursion] = useState(false);

    const database = useDatabase();
    const userId = getUserSession()?.userId;

    const isUser = getUserStatus();

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
                {isUser && (
                    <BottomPanel.Button
                        title={isFavoriteExcursion ? 'Удалить' : 'Добавить'}
                        Icon={Icons.FavouriteExcursionAction}
                        onPress={handleFavoriteToggle}
                    />
                )}

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
                options={options}
                visible={isBookingModalVisible}
                onClose={() => setBookingModalVisible(false)}
                animationType="fade"
            />
        </View>
    );
};
