import {Q} from '@nozbe/watermelondb';
import {FavoriteExcursion} from '@/shared/db/models';
import {Database} from '@nozbe/watermelondb';

export async function removeFromFavorites(
    database: Database,
    excursionId: number,
) {
    await database.write(async () => {
        const record = await database
            .get<FavoriteExcursion>('favorite_excursions')
            .query(Q.where('excursion_id', excursionId))
            .fetch();

        if (record.length) {
            await record[0].markAsDeleted();
            await record[0].destroyPermanently();
        }
    });
}
