import { FavoriteExcursion } from '@/shared/db/models';
import Realm from 'realm';


export async function addToFavorites(realm: Realm, excursionId: number, userId: string) {
    realm.write(() => {
        realm.create(FavoriteExcursion.schema.name, {
            excursionId,
            createdAt: new Date(),
            userId
        });
    });
    console.log(`Excursion ${excursionId} added to favorites.`);
}
