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
import {BottomExcursionPanel} from '@/widgets/bottomExcursionPanel/ui/BottomExcursionPanel';
import {InformationExcursionReviewsCard} from '@/widgets/informationExcursionCard';
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

    console.log(excursion.reviews_list, excursion);
    return (
        <View style={styles.container}>
            <ScreenContent contentStyle={styles.container}>
                {showReviews ? (
                    <InformationExcursionReviewsCard
                        customers_review_rating={
                            excursion.customers_review_rating
                        }
                        reviews={excursion.reviews}
                        reviews_with_text={excursion.reviews_with_text}
                        reviews_list={excursion.reviews_list}
                    />
                ) : (
                    <InformationExcursionCard excursion={excursion} />
                )}
            </ScreenContent>
            <BottomExcursionPanel
                orderOptions={excursion.order_options}
                onToggleReviews={toggleReviews}
                isReviewsVisible={showReviews}
            />
        </View>
    );
};
