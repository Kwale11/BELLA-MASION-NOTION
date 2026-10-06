import { useEffect, useState } from "react";

import CollectionFilters from "./components/CollectionFilters";
import CollectionIntro from "./components/CollectionIntro";
import CollectionProductGrid from "./components/CollectionProductGrid";
import CollectionToolbar from "./components/CollectionToolbar";

import useCollectionFilters from "./hooks/useCollectionFilters";

import "./CollectionPage.css";

export default function CollectionPage() {
    const [isFilterOpen, setIsFilterOpen] =
        useState(false);

    const {
        filters,
        sort,
        filteredProducts,
        loading,
        error,
        hasActiveFilters,
        setCategory,
        setMaterial,
        setSort,
        resetFilters,
    } = useCollectionFilters();

    useEffect(() => {
        document.body.style.overflow = isFilterOpen
            ? "hidden"
            : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isFilterOpen]);

    return (
        <main className="collection-page">
            <CollectionIntro />

            <section className="collection-page__products">
                <div className="collection-page__layout">
                    <CollectionFilters
                        filters={filters}
                        isOpen={isFilterOpen}
                        hasActiveFilters={hasActiveFilters}
                        onCategoryChange={setCategory}
                        onMaterialChange={setMaterial}
                        onReset={resetFilters}
                        onClose={() => {
                            setIsFilterOpen(false);
                        }}
                    />

                    {isFilterOpen && (
                        <button
                            type="button"
                            className="collection-page__filter-backdrop"
                            aria-label="필터 닫기"
                            onClick={() => {
                                setIsFilterOpen(false);
                            }}
                        />
                    )}

                    <div className="collection-page__results">
                        <CollectionToolbar
                            productCount={filteredProducts.length}
                            sort={sort}
                            onSortChange={setSort}
                            onFilterOpen={() => {
                                setIsFilterOpen(true);
                            }}
                        />

                        {loading ? (
                            <p role="status">상품을 불러오는 중입니다.</p>
                        ) : error ? (
                            <p role="alert">{error.message}</p>
                        ) : (
                            <CollectionProductGrid
                                products={filteredProducts}
                                onResetFilters={resetFilters}
                            />
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}