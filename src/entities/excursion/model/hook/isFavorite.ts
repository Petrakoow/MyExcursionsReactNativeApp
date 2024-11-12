import Realm from 'realm';
import {FavoriteExcursion} from '@/shared/db/models';

export function isFavorite(realm: Realm, excursionId: number): boolean {
    const record = realm.objectForPrimaryKey(
        FavoriteExcursion.schema.name,
        excursionId,
    );
    return record !== null;
}
