import { Review } from "@/shared/db/models";
import Realm from "realm";

export const updateReview = (
    realm: Realm,
    userId: string,
    excursionId: number,
    rating: number,
    reviewText: string,
) => {
    const existingReview = realm.objectForPrimaryKey<Review>(
        Review.schema.name,
        userId,
    );
    if (existingReview && existingReview.excursionId === excursionId) {
        realm.write(() => {
            existingReview.rating = rating;
            existingReview.reviewText = reviewText;
        });
    }
};
