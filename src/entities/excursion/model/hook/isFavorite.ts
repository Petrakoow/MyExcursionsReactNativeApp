import {Q} from '@nozbe/watermelondb';
import {FavoriteExcursion} from '@/shared/db/models';
import {Database} from '@nozbe/watermelondb';

export async function isFavorite(
    database: Database,
    excursionId: number,
): Promise<boolean> {
    const record = await database
        .get<FavoriteExcursion>('favorite_excursions')
        .query(Q.where('excursion_id', excursionId))
        .fetch();

    return record.length > 0;
}
