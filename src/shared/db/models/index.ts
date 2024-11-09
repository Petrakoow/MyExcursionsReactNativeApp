import {appSchema, tableSchema} from '@nozbe/watermelondb';
import {favoriteExcursionSchema} from './excursions/schema/schema';

export {FavoriteExcursion} from './excursions/model/FavoriteExcursions';
export {favoriteExcursionSchema} from './excursions/schema/schema';

export const schema = appSchema({
    version: 2,
    tables: [favoriteExcursionSchema],
});
