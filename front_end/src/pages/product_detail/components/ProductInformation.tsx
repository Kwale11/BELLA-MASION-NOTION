import {
    MessageCircle,
    ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

import type { ProductDetail } from "../types/productDetail";

import "./css/ProductInformation.css";

interface ProductInformationProps {
    product: ProductDetail;
}

const priceFormatter = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
});

export default function ProductInformation({
                                               product,
                                           }: ProductInformationProps) {
    return (
        <article className="product-information">
            <header className="product-information__header">
                <p>{product.collection}</p>

                <h1>{product.name}</h1>

                <span>{product.englishName}</span>

                <strong>
                    {priceFormatter.format(product.price)}
                </strong>
            </header>

            <div className="product-information__divider" />

            <p className="product-information__description">
                {product.description}
            </p>

            <dl className="product-information__specifications">
                {product.specifications.map((specification) => (
                    <div key={specification.label}>
                        <dt>{specification.label}</dt>
                        <dd>{specification.value}</dd>
                    </div>
                ))}
            </dl>

            <div className="product-information__notices">
                <p>
                    모든 제품은 주문 후 제작되는 상품으로 제작 기간이
                    필요합니다.
                </p>

                <p>
                    소재와 사이즈 선택에 따라 최종 금액이 달라질 수
                    있습니다.
                </p>
            </div>

            <div className="product-information__actions">
                {product.customizable && (
                    <Link
                        to={`/customize/${product.slug}`}
                        className="
              product-information__button
              product-information__button--primary
            "
                    >
                        <ShoppingBag size={17} aria-hidden="true" />
                        커스터마이징 시작
                    </Link>
                )}

                <Link
                    to="/reservation"
                    className="
            product-information__button
            product-information__button--secondary
          "
                >
                    <MessageCircle size={17} aria-hidden="true" />
                    상담 예약
                </Link>
            </div>
        </article>
    );
}