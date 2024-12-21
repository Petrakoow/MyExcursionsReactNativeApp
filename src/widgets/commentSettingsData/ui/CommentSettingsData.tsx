import React from 'react';
import {View, FlatList} from 'react-native';
import {SplashScreen} from '@/shared/ui/splashScreen';
import {ErrorText} from '@/shared/ui/errorText';
import {PreviewExcursionCard} from '@/widgets/previewExcursionCard';
import {getUserSession} from '@/shared/db/models/user';
import {AppNavigation, NavigationStackList} from '@/shared/config/navigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {styles} from './CommentSettingsDataStyle';
import {useUserReview} from '../hook/useUserReviews';
import {TourTypeRequest} from '@/shared/api';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {useDatabase} from '@/provider';
import {TextSize} from '@/shared/config/font';
import {CustomText} from '@/shared/ui/customText';

export const CommentSettingsData = () => {
    const userId = getUserSession()?.userId;
    const realm = useDatabase();
    const {
        reviews,
        isLoading,
        isError,
        handleDeleteComment,
        handleDeleteAllComments,
    } = useUserReview(userId, realm);

    const navigation = useNavigation<NavigationProp<NavigationStackList>>();

    const renderTourCard = ({item}: {item: TourTypeRequest}) => (
        <View style={styles.container}>
            <PreviewExcursionCard
                style={styles.card}
                tour={item}
                onPress={() =>
                    navigation.navigate(AppNavigation.EXCURSION_INFO, {
                        excursion: item,
                    })
                }
            />
            <CustomButton
                style={[styleButton.warningTypeButton, styles.button]}
                textButton={'Удалить комментарий'}
                textSize={TextSize.S_BASE}
                onPress={() => handleDeleteComment(item.id)}
            />
        </View>
    );

    if (isLoading) {
        return (
            <SplashScreen
                showLogotype={false}
                titleIndicator="Загрузка комментариев..."
                textSize={TextSize.S_XL}
            />
        );
    }

    if (isError) {
        return (
            <ErrorText
                title="Не удалось загрузить комментарии"
                description={isError}
            />
        );
    }

    return (
        <View>
            <CustomText style={styles.titleText}>
                Здесь отображены все ваши комментарии, которые вы оставляли. Вы
                можете сделать быстрое удаления комментария или очистить их все!
            </CustomText>
            <CustomButton
                textButton={'Удалить все комментарии'}
                style={[
                    styleButton.warningTypeButton,
                    styles.button,
                    styles.mainDeleteButton,
                ]}
                textSize={TextSize.S_BASE}
                onPress={() => {
                    handleDeleteAllComments();
                }}
            />
            <FlatList
                data={reviews}
                renderItem={renderTourCard}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                horizontal={true}
                ItemSeparatorComponent={() => <View style={{width: 16}} />}
            />
        </View>
    );
};
