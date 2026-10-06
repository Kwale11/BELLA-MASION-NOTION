import { collectionProducts } from "../pages/collection/data/products";
import type { CollectionProduct } from "../pages/collection/types/product";
import type {
    ProductDetail,
    ProductSpecification,
} from "../pages/product_detail/types/productDetail";

export interface ApiProduct
    extends Omit<CollectionProduct, "imageUrl" | "badge"> {
    imageKey: string;
    badge: CollectionProduct["badge"] | null;
    description: string;
}

export interface ApiProductDetail {
    product: ApiProduct;
    specifications: ProductSpecification[];
}

const categoryLabels: Record<CollectionProduct["category"], string> = {
    "wedding-band": "Wedding Band",
    "engagement-ring": "Engagement Ring",
    "couple-ring": "Couple Ring",
};

// 상품 이름·가격은 서버에서 받고, 기존 데이터는 이미지 연결에만 사용합니다.
const imagesBySlug = new Map(
    collectionProducts.map((product) => [
        product.slug,
        product.imageUrl,
    ]),
);

const placeholderImage = `data:image/svg+xml;charset=UTF-8,${
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">' +
        '<rect width="100%" height="100%" fill="#eeeae4"/>' +
        '<text x="50%" y="50%" text-anchor="middle" fill="#777" ' +
        'font-size="24">BELLA MAISON</text></svg>',
    )
}`;

function resolveImage(product: ApiProduct): string {
    return imagesBySlug.get(product.slug) ?? placeholderImage;
}

export function toCollectionProduct(
    product: ApiProduct,
): CollectionProduct {
    return {
        ...product,
        imageUrl: resolveImage(product),
        badge: product.badge ?? undefined,
    };
}

export function toProductDetail(
    response: ApiProductDetail,
): ProductDetail {
    const { product, specifications } = response;

    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        englishName: product.englishName,
        collection: categoryLabels[product.category] ?? product.category,
        price: product.price,
        description: product.description,
        customizable: product.customizable,
        images: [
            {
                id: 1,
                imageUrl: resolveImage(product),
                imageAlt: product.imageAlt,
            },
        ],
        specifications,
    };
}