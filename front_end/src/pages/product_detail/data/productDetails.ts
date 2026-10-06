import { collectionProducts } from "../../collection/data/products";

import type { CollectionProduct } from "../../collection/types/product";
import type {
    ProductDetail,
    ProductSpecification,
} from "../types/productDetail";

const categoryLabels: Record<
    CollectionProduct["category"],
    string
> = {
    "wedding-band": "Wedding Band",
    "engagement-ring": "Engagement Ring",
    "couple-ring": "Couple Ring",
};

const materialLabels: Record<
    CollectionProduct["material"],
    string
> = {
    "14k": "14K Gold",
    "18k": "18K Gold",
    platinum: "Platinum",
};

const productDescriptions: Record<string, string> = {
    "eternal-classic-band":
        "절제된 곡선과 부드러운 착용감을 담은 벨라메종의 시그니처 웨딩 밴드입니다. 두 사람의 취향에 따라 소재와 표면 마감, 각인 문구를 선택할 수 있습니다.",

    "maison-diamond-band":
        "섬세하게 세팅된 다이아몬드와 간결한 밴드 디자인이 조화를 이루는 웨딩 링입니다.",

    "lumiere-engagement-ring":
        "빛을 섬세하게 담아내는 다이아몬드 세팅이 돋보이는 클래식한 프로포즈 링입니다.",

    "petite-solitaire-ring":
        "정제된 솔리테어 디자인과 가벼운 착용감을 갖춘 우아한 인게이지먼트 링입니다.",

    "signature-couple-band":
        "두 사람의 취향을 균형 있게 담아낸 벨라메종의 시그니처 커플 밴드입니다.",

    "pure-platinum-band":
        "플래티넘 고유의 깊고 차분한 색감을 살린 클래식 웨딩 밴드입니다.",

    "rose-promise-ring":
        "부드러운 로즈 골드 컬러와 섬세한 곡선이 어우러진 로맨틱한 웨딩 링입니다.",

    "celeste-diamond-ring":
        "별빛을 연상시키는 다이아몬드 세팅이 특징인 우아한 웨딩 주얼리입니다.",
};

function createSpecifications(
    material: CollectionProduct["material"],
): ProductSpecification[] {
    return [
        {
            label: "Material",
            value: materialLabels[material],
        },
        {
            label: "Color",
            value: "주문 시 선택",
        },
        {
            label: "Width",
            value: "디자인별 상이",
        },
        {
            label: "Size",
            value: "주문 시 선택",
        },
        {
            label: "Production",
            value: "주문 후 약 3–4주",
        },
    ];
}

/**
 * CollectionProduct를 ProductDetail로 변환합니다.
 *
 * CollectionProductCard의 Link state로 전달받은 상품에도
 * 이 함수를 사용할 수 있습니다.
 */
export function createProductDetail(
    product: CollectionProduct,
): ProductDetail {
    return {
        id: product.id,
        slug: product.slug,

        name: product.name,
        englishName: product.englishName,
        collection: categoryLabels[product.category],

        price: product.price,

        description:
            productDescriptions[product.slug] ??
            "벨라메종의 섬세한 제작 과정을 통해 완성된 웨딩 주얼리입니다.",

        customizable: product.customizable,

        images: [
            {
                id: 1,
                imageUrl: product.imageUrl,
                imageAlt: product.imageAlt,
            },
        ],

        specifications: createSpecifications(
            product.material,
        ),
    };
}

/**
 * collectionProducts의 모든 상품을
 * slug를 키로 가지는 상세 상품 객체로 변환합니다.
 */
export const productDetails: Record<string, ProductDetail> =
    Object.fromEntries(
        collectionProducts.map((product) => [
            product.slug,
            createProductDetail(product),
        ]),
    );

/**
 * URL의 productSlug를 사용하여 상품을 조회합니다.
 */
export function getProductDetail(
    productSlug: string,
): ProductDetail | undefined {
    return productDetails[productSlug];
}