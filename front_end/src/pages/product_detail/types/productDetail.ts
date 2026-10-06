export interface ProductDetailImage {
    id: number;
    imageUrl: string;
    imageAlt: string;
}

export interface ProductSpecification {
    label: string;
    value: string;
}

export interface ProductDetail {
    id: number;
    slug: string;
    name: string;
    englishName: string;
    collection: string;
    price: number;
    description: string;
    customizable: boolean;
    images: ProductDetailImage[];
    specifications: ProductSpecification[];
}

export interface ProductZoomState {
    isActive: boolean;
    imageUrl: string;
    positionX: number;
    positionY: number;
}