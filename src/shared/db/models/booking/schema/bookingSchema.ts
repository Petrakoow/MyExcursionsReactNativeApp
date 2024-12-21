import Realm from 'realm';

export class Reservation extends Realm.Object {
    static schema = {
        name: 'Reservation',
        primaryKey: 'id',
        properties: {
            id: 'string',
            userId: 'string',
            excursionId: 'int',
            eventTitle: 'string',
            eventDescription: 'string',
            reservationDate: 'date',
            eventDate: 'date',
        },
    };

    id!: string;
    userId!: string;
    excursionId!: number;
    eventTitle!: string;
    eventDescription!: string;
    reservationDate!: Date;
    eventDate!: Date;
}
