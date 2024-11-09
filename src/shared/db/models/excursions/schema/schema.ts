import {tableSchema} from '@nozbe/watermelondb';

export const favoriteExcursionSchema = tableSchema({
    name: 'favorite_excursions',
    columns: [
        {name: 'excursion_id', type: 'number'},
        {name: 'title', type: 'string'},
        {name: 'created_at', type: 'number'},
    ],
});
