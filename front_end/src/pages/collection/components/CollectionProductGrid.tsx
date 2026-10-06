import type { CollectionProduct } from "../types/product";

import CollectionProductCard from "./CollectionProductCard";

import "./css/CollectionProductGrid.css";

interface CollectionProductGridProps {
    products: CollectionProduct[];
    onResetFilters: () => void;
}

export default function CollectionProductGrid({
                                                  products,
                                                  onResetFilters,
                                              }: CollectionProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="collection-product-grid__empty">
                <p>조건에 맞는 제품이 없습니다.</p>

                <button
                    type="button"
                    onClick={onResetFilters}
                >
                    전체 제품 보기
                </button>
            </div>
        );
    }

    return (
        <div className="collection-product-grid">
            {products.map((product) => (
                <CollectionProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
}