import { Link } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import {
    toCollectionProduct,
    type ApiProduct,
} from "../../../api/products";

import "./css/NewArrivalsSection.css";
import "./css/ProductCard.css";

const priceFormatter = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
});

export default function NewArrivalsSection() {
    const { data, loading, error } = useApi<ApiProduct[]>(
        "/api/products?sort=newest",
    );

    const products = (data ?? []).slice(0, 4).map(toCollectionProduct);

    return (
        <section className="new-arrivals">
            <header className="new-arrivals__header">
                <p>New arrivals</p>
                <h2>새롭게 선보이는 주얼리 컬렉션</h2>
            </header>

            {loading ? (
                <p role="status">상품을 불러오는 중입니다.</p>
            ) : error ? (
                <p role="alert">{error.message}</p>
            ) : products.length === 0 ? (
                <p>등록된 상품이 없습니다.</p>
            ) : (
                <div className="new-arrivals__grid">
                    {products.map((product) => (
                        <article className="product-card" key={product.id}>
                            <Link
                                to={`/products/${encodeURIComponent(product.slug)}`}
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
                            </Link>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}