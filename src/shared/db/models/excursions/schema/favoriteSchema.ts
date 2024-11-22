import Realm from 'realm';

export class FavoriteExcursion extends Realm.Object {
    static schema = {
        name: 'FavoriteExcursion',
        primaryKey: 'id', 
        properties: {
            id: 'string',
            excursionId: 'int',
            userId: 'string',
        },
    };

    id!: string;
    excursionId!: number;
    userId!: string;
}
