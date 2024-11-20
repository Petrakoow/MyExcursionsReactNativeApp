import Realm from 'realm';
import {FavoriteExcursion} from '@/shared/db/models';

export const removeFromFavorites = (
    realm: Realm,
    excursionId: number,
    userId: string,
) => {
    realm.write(() => {
        const excursion = realm
            .objects(FavoriteExcursion.schema.name)
            .filtered(
                'excursionId = $0 AND userId = $1',
                excursionId,
                userId,
            )[0];
        if (excursion) {
            realm.delete(excursion);
        }
    });
};
