import {database} from '@/shared/db';
import {Q} from '@nozbe/watermelondb';
import {FavoriteExcursion} from '@/shared/db/models';

export async function isFavorite(excursionId: number): Promise<boolean> {
    const record = await database
        .get<FavoriteExcursion>('favorite_excursions')
        .query(Q.where('excursion_id', excursionId))
        .fetch();

    return record.length > 0;
}
