import Realm from 'realm';
import {FavoriteExcursion} from '@/shared/db/models';

export const deleteAllFavoriteExcursions = (
    realm: Realm,
    userId: string,
): void => {
    realm.write(() => {
        const userFavorites = realm
            .objects<FavoriteExcursion>(FavoriteExcursion.schema.name)
            .filtered(`userId == $0`, userId);
        realm.delete(userFavorites);
    });
};
