import Realm from 'realm';

export class Review extends Realm.Object {
    static schema = {
        name: 'Review',
        primaryKey: 'userId',
        properties: {
            userId: 'string',
            excursionId: 'int',
            userInitials: 'string',
            rating: 'int',
            reviewText: 'string',
            reviewDate: 'date',
        },
    };

    userId!: string;
    excursionId!: number;
    userInitials!: string;
    rating!: number;
    reviewText!: string;
    reviewDate!: Date;
}
