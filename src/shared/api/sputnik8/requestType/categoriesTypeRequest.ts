export type ProductType = {
    id: number;
    name: string;
};

export type SubCategoryType = {
    id: number;
    name: string;
    description: string;
    products: ProductType[];
    url: string;
};

export type CategoryType = {
    sub_categories: SubCategoryType[];
};