import Realm from 'realm';
import { FavoriteExcursion } from '@/shared/db/models';

export const isFavorite = (
    realm: Realm,
    excursionId: number,
    userId: string,
): boolean => {
    const id = `${userId}-${excursionId}`;
    const record = realm
        .objects(FavoriteExcursion.schema.name)
        .filtered('id = $0', id)[0];
    return !!record;
};
