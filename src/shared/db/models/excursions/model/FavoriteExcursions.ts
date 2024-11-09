import {Model} from '@nozbe/watermelondb';
import {field, date, text} from '@nozbe/watermelondb/decorators';

export class FavoriteExcursion extends Model {
    static table = 'favorite_excursions';

    @field('excursion_id') excursionId!: number;
    @date('created_at') createdAt!: Date;
}
