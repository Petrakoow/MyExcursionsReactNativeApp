export type TourReviewTypeRequest = {
    reviews: {
        content: string;
        rating: number;
        name: string;
        date: string;
        userId?: string;
    }[];
    pagination: {
        next_page_token: string;
        max_page_size: number;
    };
};
