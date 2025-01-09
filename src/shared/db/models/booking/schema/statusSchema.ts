import Realm from 'realm';

export class Status extends Realm.Object {
    static schema = {
        name: 'Status',
        primaryKey: 'userId',
        properties: {
            userId: 'string',
            isVerified: { type: 'bool', default: false },
        },
    };

    userId!: string;
    isVerified!: boolean;
}
