import React, {useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
    NavigationStackList,
    AppNavigation,
} from '@/shared/config/navigation/types';
import {ScreenContent} from '@/shared/ui/screenContent';
import {InformationExcursionCard} from '@/widgets/informationExcursionCard';
import {View} from 'react-native';
import {styles} from './ExcursionInfoPageScreenStyle';
import {BottomExcursionPanel} from '@/widgets/bottomExcursionPanel';
import {InformationExcursionReviewsCard} from '@/widgets/InformationExcursionReviewsCard';

export const ExcursionInfoPageScreen = () => {
    const route =
        useRoute<
            RouteProp<NavigationStackList, AppNavigation.EXCURSION_INFO>
        >();
    const {excursion} = route.params;

    const [showReviews, setShowReviews] = useState(false);

    const toggleReviews = () => {
        setShowReviews(prev => !prev);
    };

    return (
        <ScreenContent>
            <View style={styles.container}>
                {showReviews ? (
                    <InformationExcursionReviewsCard
                        customersReviewRating={
                            excursion.customers_review_rating
                        }
                        uid={excursion.id}
                    />
                ) : (
                    <InformationExcursionCard excursion={excursion} />
                )}

                <BottomExcursionPanel
                    orderOptions={excursion.order_options}
                    onToggleReviews={toggleReviews}
                    isReviewsVisible={showReviews}
                    excursionId={excursion.id}
                />
            </View>
        </ScreenContent>
    );
};
