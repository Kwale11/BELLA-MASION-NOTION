import { SlidersHorizontal } from "lucide-react";

import type { CollectionSort } from "../types/product";

import "./css/CollectionToolbar.css";

interface CollectionToolbarProps {
    productCount: number;
    sort: CollectionSort;
    onSortChange: (sort: CollectionSort) => void;
    onFilterOpen: () => void;
}

export default function CollectionToolbar({
                                              productCount,
                                              sort,
                                              onSortChange,
                                              onFilterOpen,
                                          }: CollectionToolbarProps) {
    return (
        <div className="collection-toolbar">
            <p>
                <strong>{productCount}</strong>
                <span> products</span>
            </p>

            <div className="collection-toolbar__actions">
                <button
                    type="button"
                    className="collection-toolbar__filter-button"
                    onClick={onFilterOpen}
                >
                    <SlidersHorizontal
                        size={16}
                        aria-hidden="true"
                    />
                    Filter
                </button>

                <label className="collection-toolbar__sort">
                    <span className="sr-only">제품 정렬</span>

                    <select
                        value={sort}
                        onChange={(event) => {
                            onSortChange(
                                event.target.value as CollectionSort,
                            );
                        }}
                    >
                        <option value="recommended">
                            추천순
                        </option>

                        <option value="newest">
                            신상품순
                        </option>

                        <option value="price-low">
                            낮은 가격순
                        </option>

                        <option value="price-high">
                            높은 가격순
                        </option>
                    </select>
                </label>
            </div>
        </div>
    );
}