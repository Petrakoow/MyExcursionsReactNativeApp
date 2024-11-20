import Realm from 'realm';

export class FavoriteExcursion extends Realm.Object {
    static schema = {
        name: 'FavoriteExcursion',
        primaryKey: 'excursionId',
        properties: {
            excursionId: 'int',
            createdAt: 'date',
            userId: 'string',
        },
    };

    excursionId!: number;
    createdAt!: Date;
    userId!: string;
}
