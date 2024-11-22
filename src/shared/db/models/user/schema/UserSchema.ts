import Realm from 'realm';

export class User extends Realm.Object {
    static schema = {
        name: 'User',
        primaryKey: 'userId',
        properties: {
            userId: 'string',
            username: 'string',
            email: 'string', 
            role: 'string', 
            name: 'string?', 
            profileIcon: 'string?', 
            country: 'string?',
            phoneNumber: 'string?', 
            profileSignature: 'string?',
        },
    };

    userId!: string;
    username!: string;
    email!: string;
    name?: string;
    role!: string;
    profileIcon?: string;
    country?: string;
    phoneNumber?: string;
    profileSignature?: string;
}
