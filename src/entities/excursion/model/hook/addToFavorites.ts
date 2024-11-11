import {FavoriteExcursion} from '@/shared/db/models';
import {Database} from '@nozbe/watermelondb';

export async function addToFavorites(database: Database, excursionId: number) {
    await database.write(async () => {
        await database
            .get<FavoriteExcursion>('favorite_excursions')
            .create(excursion => {
                excursion.excursionId = excursionId;
                excursion.createdAt = new Date();
            });
    });
}
