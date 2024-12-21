import {deleteAllFavoriteExcursions} from '@/entities/excursion';
import {useDatabase} from '@/provider';
import {getUserSession} from '@/shared/db/models/user';
import {confirmAction} from '@/shared/utils';

export const useConfirmClearFavorites = () => {
    const realm = useDatabase();

    const confirmClearFavorites = () => {
        confirmAction(
            'Подтверждение удаления',
            'Вы уверены, что хотите удалить все элементы из списка избранного? Это действие невозможно отменить.',
            () => clearFavorites(),
        );
    };

    const clearFavorites = () => {
        const userId = getUserSession()?.userId;
        if (userId) {
            deleteAllFavoriteExcursions(realm, userId);
        }
    };

    return {confirmClearFavorites};
};
