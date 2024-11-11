import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {FavoriteExcursion} from './models';
import {schema} from './models';

let database: Database | null = null;

function initializeDatabase() {
    if (!database) {
        const adapter = new SQLiteAdapter({
            dbName: 'appDatabase',
            schema,
        });
        database = new Database({
            adapter,
            modelClasses: [FavoriteExcursion],
        });
    }
    return database;
}

export function getDatabase() {
    return initializeDatabase();
}
