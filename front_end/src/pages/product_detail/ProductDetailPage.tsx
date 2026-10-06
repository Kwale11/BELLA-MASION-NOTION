import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import useApi from "../../hooks/useApi";
import { ApiError } from "../../api/http";
import {
    toProductDetail,
    type ApiProductDetail,
} from "../../api/products";

import ProductBreadcrumb from "./components/ProductBreadcrumb";
import ProductGallery from "./components/ProductGallery";
import ProductInformation from "./components/ProductInformation";
import ProductZoomPreview from "./components/ProductZoomPreview";

import type {
    ProductDetail,
    ProductZoomState,
} from "./types/productDetail";

import "./ProductDetailPage.css";

function ProductDetailContent({ product }: { product: ProductDetail }) {
    const [zoom, setZoom] = useState<ProductZoomState>({
        isActive: false,
        imageUrl: "",
        positionX: 50,
        positionY: 50,
    });

    return (
        <main className="product-detail-page">
            <ProductBreadcrumb productName={product.name} />

            <section className="product-detail-page__layout">
                <ProductGallery
                    images={product.images}
                    onZoomChange={setZoom}
                />

                <div className="product-detail-page__side">
                    <ProductInformation product={product} />
                    <ProductZoomPreview zoom={zoom} />
                </div>
            </section>
        </main>
    );
}

export default function ProductDetailPage() {
    const { productSlug } = useParams<{ productSlug: string }>();

    const { data, loading, error } = useApi<ApiProductDetail>(
        productSlug
            ? `/api/products/${encodeURIComponent(productSlug)}`
            : null,
    );

    if (loading) {
        return <main><p role="status">상품을 불러오는 중입니다.</p></main>;
    }

    if (error || !data) {
        const notFound =
            !productSlug ||
            (error instanceof ApiError && error.status === 404);

        return (
            <main className="product-detail-not-found">
                <h1>
                    {notFound
                        ? "상품을 찾을 수 없습니다."
                        : "상품을 불러오지 못했습니다."}
                </h1>
                {error && <p role="alert">{error.message}</p>}
                <Link to="/products">컬렉션으로 돌아가기</Link>
            </main>
        );
    }

    return (
        <ProductDetailContent
            key={data.product.slug}
            product={toProductDetail(data)}
        />
    );
}