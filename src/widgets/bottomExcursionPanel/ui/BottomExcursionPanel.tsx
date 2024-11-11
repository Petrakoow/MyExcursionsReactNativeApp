import React, {useState, useEffect} from 'react';
import {BottomPanel} from '@/shared/ui/bottomPanel';
import * as Icons from '@/shared/assets/icons';
import {TourTypeRequest} from '@/shared/api/sputnik8';
import {BookingModal} from '@/widgets/excursionModalWindow';
import {Colors} from '@/shared/config/colors';
import {View} from 'react-native';
import {
    addToFavorites,
    isFavorite,
    removeFromFavorites,
} from '@/entities/excursion';
import {useDatabase} from '@/app/providers';
import {ErrorText} from '@/shared/ui/errorText';

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
    const [isBookingModalVisible, setBookingModalVisible] = useState(false);
    const [isFavoriteExcursion, setIsFavoriteExcursion] = useState(false);

    const database = useDatabase();

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            const favoriteStatus = await isFavorite(database, excursionId);
            setIsFavoriteExcursion(favoriteStatus);
        };
        fetchFavoriteStatus();
    }, [excursionId]);

    const handleFavoriteToggle = async () => {
        if (isFavoriteExcursion) {
            await removeFromFavorites(database, excursionId);
        } else {
            await addToFavorites(database, excursionId);
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
                            ? Colors.widget.informationTourCard.bottomPanel
                                  .active
                            : Colors.widget.informationTourCard.bottomPanel
                                  .unactive
                    }
                />
            </BottomPanel>

            <BookingModal
                orderOptions={orderOptions}
                visible={isBookingModalVisible}
                onClose={() => setBookingModalVisible(false)}
            />
        </View>
    );
};
