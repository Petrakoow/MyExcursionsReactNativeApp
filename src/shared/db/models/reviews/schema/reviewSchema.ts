import Realm from 'realm';

export class Review extends Realm.Object {
    static schema = {
        name: 'Review',
        primaryKey: 'id',
        properties: {
            id: 'string',
            userId: 'string',
            excursionId: 'int',
            rating: 'int',
            content: 'string',
            date: 'string',
        },
    };

    id!: string;
    userId!: string;
    excursionId!: number;
    rating!: number;
    content!: string;
    date!: string;
}
