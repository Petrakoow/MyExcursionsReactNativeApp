import Realm from 'realm';
import {FavoriteExcursion} from '@/shared/db/models';

export const isFavorite = (
    realm: Realm,
    excursionId: number,
    userId: string,
): boolean => {
    const record = realm
        .objects(FavoriteExcursion.schema.name)
        .filtered('excursionId = $0 AND userId = $1', excursionId, userId)[0];
    return !!record;
};
