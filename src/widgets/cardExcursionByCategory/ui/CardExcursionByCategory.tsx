import React from 'react';
import {fetchTourInfo} from '@/entities/api';
import {AppNavigation, NavigationStackList} from '@/shared/config/navigation';
import {CustomText} from '@/shared/ui/customText';
import {TouchableOpacity, Alert} from 'react-native';
import {ProductType} from '@/shared/api';
import {NavigationProp} from '@react-navigation/native';
import {styles} from './CardExcursionByCategoryStyle';

type CardExcursionByCategory = {
    item: ProductType;
    navigation: NavigationProp<NavigationStackList>;
};

export const CardExcursionByCategory = (props: CardExcursionByCategory) => {
    const {item, navigation} = props;
    return (
        <TouchableOpacity
            style={styles.excursionCard}
            onPress={async () => {
                try {
                    const excursionInfo = await fetchTourInfo(item.id);
                    navigation.navigate(AppNavigation.EXCURSION_INFO, {
                        excursion: excursionInfo,
                    });
                } catch (err) {
                    Alert.alert(
                        `Error fetching excursion info ${item.name} ${item.id}`,
                    );
                }
            }}>
            <CustomText style={styles.excursionText}>{item.name}</CustomText>
        </TouchableOpacity>
    );
};
