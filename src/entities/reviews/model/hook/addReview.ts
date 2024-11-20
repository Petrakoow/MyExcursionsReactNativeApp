import { Review } from "@/shared/db/models";
import Realm from "realm";

export const addReview = (
    realm: Realm,
    userId: string,
    excursionId: number,
    userInitials: string,
    rating: number,
    reviewText: string,
) => {
    realm.write(() => {
        realm.create(
            Review.schema.name,
            {
                userId,
                excursionId,
                userInitials,
                rating,
                reviewText,
                reviewDate: new Date(),
            }
        );
    });
};