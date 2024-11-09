import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {favoriteExcursionSchema} from './models';
import {FavoriteExcursion} from './models';
import {schema} from './models';

const adapter = new SQLiteAdapter({
    dbName: 'appDatabase',
    schema,
});

export const database = new Database({
    adapter,
    modelClasses: [FavoriteExcursion],
});
