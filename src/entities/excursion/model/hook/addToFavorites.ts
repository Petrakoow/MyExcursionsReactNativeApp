import {FavoriteExcursion} from '@/shared/db/models';
import {database} from '@/shared/db';

export async function addToFavorites(excursionId: number) {
    await database.write(async () => {
        await database
            .get<FavoriteExcursion>('favorite_excursions')
            .create(excursion => {
                excursion.excursionId = excursionId;
                excursion.createdAt = new Date();
            });
    });
}
