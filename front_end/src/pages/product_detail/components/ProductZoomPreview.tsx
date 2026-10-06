import type { ProductZoomState } from "../types/productDetail";

import "./css/ProductZoomPreview.css";

interface ProductZoomPreviewProps {
    zoom: ProductZoomState;
}

export default function ProductZoomPreview({
                                               zoom,
                                           }: ProductZoomPreviewProps) {
    return (
        <div
            className={`product-zoom-preview ${
                zoom.isActive
                    ? "product-zoom-preview--visible"
                    : ""
            }`}
            style={{
                backgroundImage: zoom.imageUrl
                    ? `url("${zoom.imageUrl}")`
                    : undefined,

                backgroundPosition: `${zoom.positionX}% ${zoom.positionY}%`,
            }}
            aria-hidden="true"
        >
            <span>Zoom preview</span>
        </div>
    );
}