import React from 'react';
import {View} from 'react-native';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {CustomText} from '@/shared/ui/customText';
import {TextSize} from '@/shared/config/font';
import {styles} from './FavoriteSettingsStyle';
import {useConfirmClearFavorites} from '../hook/useConfirmClearFavorites';

export const FavoriteSettings = () => {
    const {confirmClearFavorites} = useConfirmClearFavorites();

    return (
        <View>
            <CustomText style={styles.informationText}>
                Нажав эту кнопку, вы удалите все элементы из списка избранного.
                Это действие невозможно отменить, и весь сохранённый контент
                будет удалён из раздела избранного. Убедитесь, что вы хотите
                удалить все элементы, прежде чем подтверждать действие.
            </CustomText>
            <CustomButton
                textButton={'Удалить всё избранное'}
                style={[styleButton.warningTypeButton, styles.button]}
                onPress={confirmClearFavorites}
                textSize={TextSize.S_BASE}
            />
        </View>
    );
};
