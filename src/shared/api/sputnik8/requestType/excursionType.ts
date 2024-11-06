export type TourTypeRequest = {
    id: number;
    activity_type: 'tour' | 'entry_ticket' | 'transfer' | 'composite_activity';
    title: string;
    updated_at: string;
    netto_price: number;
    order_options: {
        id: number;
        title: string;
        ticket_type:
            | 'group_tour, ticket_per_person'
            | 'private_tour, ticket_per_group'
            | 'private_tour, ticket_per_person';
        is_base: boolean;
        duration: string | number;
        order_lines: {
            price: number;
            discount?: {
                value: number;
                expiration_date?: string;
                expiration_text?: string;
                original_price: number;
            };
            all_prices: {[currency: string]: number};
            netto_prices: {[currency: string]: number};
            all_amounts_to_pay: {[currency: string]: number};
            price_per: string;
            title: string;
            offer_type: string;
            countable: boolean;
            start_date: string;
            from_quantity: number;
            to_quantity: number;
        }[];
        schedule: {
            id: null;
            name: string;
        };
    }[];
    pay_type: 'post_pay' | 'deposit' | 'full_pay';
    pay_type_in_text: string;
    deposit_amount?: number;
    categories: {
        id: number;
        slug: string;
        language: string;
        short_name?: string;
        description?: string;
        name: string;
    }[];
    rating: number;
    recommendation: number;
    languages: string[];
    description: string;
    url: string;
    main_photo: {
        original: string;
        small: string;
        big: string;
        name: string;
    };
    what_included?: string;
    what_not_included?: string;
    customers_review_rating: number;
    reviews: number;
    reviews_with_text: number;
    begin_place?: {
        address: string;
    };
    finish_point?: string;
    minimum_book_period?: number;
    places_to_see?: string[];
    short_info?: string;
    reviews_list?: {
        activity_id: number;
        content: string;
        rating: number;
        name: string;
        date: string;
    }[];
    country_id: number;
    country_slug: string;
    region_id: number;
    city_id: number;
    city_slug: string;
    price: number;
    image_small: string;
    image_big: string;
    duration: string;
    product_type: 'shared' | 'private';
    host?: {
        id: number;
        name: string;
        photo: string;
        review_rating: number;
        link: string;
    };
};
