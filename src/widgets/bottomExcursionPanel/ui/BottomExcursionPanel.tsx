import React, {useState} from 'react';
import {BottomPanel} from '@/shared/ui/bottomPanel';
import * as Icons from '@/shared/assets/icons';
import {TourTypeRequest} from '@/shared/api/sputnik8';
import {BookingModal} from '@/widgets/excursionModalWindow';
import {Colors} from '@/shared/config/colors';

type BottomExcursionPanelProps = {
    orderOptions: TourTypeRequest['order_options'];
    onToggleReviews: () => void;
    isReviewsVisible: boolean;
};

export const BottomExcursionPanel = (props: BottomExcursionPanelProps) => {
    const {orderOptions, onToggleReviews, isReviewsVisible} = props;
    const [isBookingModalVisible, setBookingModalVisible] = useState(false);
    const handleBookingPress = () => {
        setBookingModalVisible(true);
    };

    return (
        <>
            <BottomPanel>
                <BottomPanel.Button
                    title="Добавить"
                    Icon={Icons.FavouriteExcursionAction}
                    onPress={() => {}}
                />
                <BottomPanel.Button
                    title="Бронь"
                    Icon={Icons.BookingExcursionAction}
                    onPress={handleBookingPress}
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
        </>
    );
};
