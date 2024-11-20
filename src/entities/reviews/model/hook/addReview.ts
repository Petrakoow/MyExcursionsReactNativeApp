import {Review} from '@/shared/db/models';
import Realm from 'realm';

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const addReview = (
    realm: Realm,
    userId: string,
    excursionId: number,
    name: string,
    rating: number,
    content: string,
) => {
    realm.write(() => {
        realm.create(Review.schema.name, {
            userId,
            excursionId,
            name,
            rating,
            content,
            date: formatDate(new Date()),
        });
    });
};
