import Realm from 'realm';
import {FavoriteExcursion} from '@/shared/db/models';

export async function addToFavorites(realm: Realm, excursionId: number) {
    realm.write(() => {
        realm.create(FavoriteExcursion.schema.name, {
            excursionId,
            createdAt: new Date(),
        });
    });
    console.log(`Excursion ${excursionId} added to favorites.`);
}
