import Realm from 'realm';

export class Review extends Realm.Object {
    static schema = {
        name: 'Review',
        primaryKey: 'userId',
        properties: {
            userId: 'string',
            excursionId: 'int',
            name: 'string',
            rating: 'int',
            content: 'string',
            date: 'string',
        },
    };

    userId!: string;
    excursionId!: number;
    name!: string;
    rating!: number;
    content!: string;
    date!: string;
}
