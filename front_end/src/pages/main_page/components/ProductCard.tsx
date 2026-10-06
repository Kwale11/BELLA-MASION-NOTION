import type { Product } from "../types/product";

import "./css/ProductCard.css";

interface ProductCardProps {
    product: Product;
}

const priceFormatter = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
});

export default function ProductCard({
                                        product,
                                    }: ProductCardProps) {
    return (
        <article className="product-card">
            <a
                href={`/products/${product.id}`}
                className="product-card__link"
            >
                <div className="product-card__image">
                    <img
                        src={product.imageUrl}
                        alt={product.imageAlt}
                        loading="lazy"
                    />
                </div>

                <div className="product-card__information">
                    <h3>{product.name}</h3>
                    <p>{priceFormatter.format(product.price)}</p>
                </div>
            </a>
        </article>
    );
}