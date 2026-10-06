import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import "./css/ProductBreadcrumb.css";

interface ProductBreadcrumbProps {
    productName: string;
}

export default function ProductBreadcrumb({
                                              productName,
                                          }: ProductBreadcrumbProps) {
    return (
        <nav
            className="product-breadcrumb"
            aria-label="현재 위치"
        >
            <Link to="/">Home</Link>

            <ChevronRight size={13} aria-hidden="true" />

            <Link to="/products">Collection</Link>

            <ChevronRight size={13} aria-hidden="true" />

            <span>{productName}</span>
        </nav>
    );
}