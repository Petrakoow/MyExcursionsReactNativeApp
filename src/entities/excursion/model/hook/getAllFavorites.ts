import Realm from 'realm';
import {FavoriteExcursion} from '@/shared/db/models';

export const getAllFavoriteExcursions = (
    realm: Realm,
    userId: string,
): FavoriteExcursion[] => {
    return realm
        .objects<FavoriteExcursion>('FavoriteExcursion')
        .filtered(`userId == $0`, userId)
        .slice();
};
