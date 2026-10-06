export type ProductCategory =
    | "wedding-band"
    | "engagement-ring"
    | "couple-ring";

export type ProductMaterial =
    | "14k"
    | "18k"
    | "platinum";

export type CollectionSort =
    | "recommended"
    | "newest"
    | "price-low"
    | "price-high";

export interface CollectionFiltersState {
    category: ProductCategory | "all";
    material: ProductMaterial | "all";
}

export interface CollectionProduct {
    id: number;
    slug: string;
    name: string;
    englishName: string;
    category: ProductCategory;
    material: ProductMaterial;
    price: number;
    imageUrl: string;
    imageAlt: string;
    badge?: "New" | "Best" | "Exclusive";
    customizable: boolean;
    releasedAt: string;
    recommendedOrder: number;
}