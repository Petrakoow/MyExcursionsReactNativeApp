import Realm from 'realm';
import { FavoriteExcursion } from '@/shared/db/models';

export async function removeFromFavorites(realm: Realm, excursionId: number) {
    realm.write(() => {
        const excursion = realm.objectForPrimaryKey(FavoriteExcursion.schema.name, excursionId);
        if (excursion) {
            realm.delete(excursion);
            console.log(`Excursion ${excursionId} removed from favorites.`);
        } else {
            console.log(`Excursion ${excursionId} not found in favorites.`);
        }
    });
}
