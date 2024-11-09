import {database} from '@/shared/db';
import {Q} from '@nozbe/watermelondb';
import {FavoriteExcursion} from '@/shared/db/models';

export async function removeFromFavorites(excursionId: number) {
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
