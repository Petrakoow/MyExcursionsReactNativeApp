import {FavoriteExcursion} from '@/shared/db/models';
import Realm from 'realm';

export const addToFavorites = (
    realm: Realm,
    excursionId: number,
    userId: string,
) => {
    realm.write(() => {
        const id = `${userId}-${excursionId}`;
        realm.create(FavoriteExcursion.schema.name, {
            id,
            excursionId,
            userId,
        });
    });
};
