import { useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

import type { CollectionProduct } from "../types/product";

import "./css/CollectionProductCard.css";

interface CollectionProductCardProps {
    product: CollectionProduct;
}

const priceFormatter = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
});

export default function CollectionProductCard({
                                                  product,
                                              }: CollectionProductCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    const productDetailPath =
        `/products/${encodeURIComponent(product.slug)}`;

    const navigationState = {
        product,
    };

    return (
        <article className="collection-product-card">
            <div className="collection-product-card__media">
                <Link
                    to={productDetailPath}
                    state={navigationState}
                >
                    <img
                        src={product.imageUrl}
                        alt={product.imageAlt}
                        loading="lazy"
                        width={800}
                        height={1000}
                    />
                </Link>

                {product.badge && (
                    <span className="collection-product-card__badge">
                        {product.badge}
                    </span>
                )}

                <button
                    type="button"
                    className={`collection-product-card__favorite ${
                        isFavorite
                            ? "collection-product-card__favorite--active"
                            : ""
                    }`}
                    aria-label={
                        isFavorite
                            ? `${product.name} 관심 상품 해제`
                            : `${product.name} 관심 상품 등록`
                    }
                    aria-pressed={isFavorite}
                    onClick={() => {
                        setIsFavorite((previous) => !previous);
                    }}
                >
                    <Heart
                        size={18}
                        fill={isFavorite ? "currentColor" : "none"}
                        aria-hidden="true"
                    />
                </button>
            </div>

            <div className="collection-product-card__information">
                <Link
                    to={productDetailPath}
                    state={navigationState}
                >
                    <p>{product.englishName}</p>
                    <h2>{product.name}</h2>
                </Link>

                <div className="collection-product-card__price">
                    <span>
                        {priceFormatter.format(product.price)}
                    </span>

                    {product.customizable && (
                        <small>Customizable</small>
                    )}
                </div>
            </div>
        </article>
    );
}