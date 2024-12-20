import Realm from 'realm';
import {FavoriteExcursion} from '@/shared/db/models';

export const removeFromFavorites = (
    realm: Realm,
    excursionId: number,
    userId: string,
) => {
    const id = `${userId}-${excursionId}`;
    realm.write(() => {
        const excursion = realm
            .objects(FavoriteExcursion.schema.name)
            .filtered('id = $0', id)[0];
        if (excursion) {
            realm.delete(excursion);
        }
    });
};
