import { useState } from "react";
import useApi from "../../../hooks/useApi";
import {
    toCollectionProduct,
    type ApiProduct,
} from "../../../api/products";

import type {
    CollectionFiltersState,
    CollectionSort,
    ProductCategory,
    ProductMaterial,
} from "../types/product";

const initialFilters: CollectionFiltersState = {
    category: "all",
    material: "all",
};

export default function useCollectionFilters() {
    const [filters, setFilters] =
        useState<CollectionFiltersState>(initialFilters);
    const [sort, setSort] =
        useState<CollectionSort>("recommended");

    const query = new URLSearchParams({
        category: filters.category,
        material: filters.material,
        sort,
    });

    const { data, loading, error } = useApi<ApiProduct[]>(
        `/api/products?${query.toString()}`,
    );

    const setCategory = (category: ProductCategory | "all") => {
        setFilters((previous) => ({ ...previous, category }));
    };

    const setMaterial = (material: ProductMaterial | "all") => {
        setFilters((previous) => ({ ...previous, material }));
    };

    const resetFilters = () => {
        setFilters(initialFilters);
    };

    return {
        filters,
        sort,
        filteredProducts: (data ?? []).map(toCollectionProduct),
        loading,
        error,
        hasActiveFilters:
            filters.category !== "all" || filters.material !== "all",
        setCategory,
        setMaterial,
        setSort,
        resetFilters,
    };
}