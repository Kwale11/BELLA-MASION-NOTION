import { RotateCcw, X } from "lucide-react";

import type {
    CollectionFiltersState,
    ProductCategory,
    ProductMaterial,
} from "../types/product";

import "./css/CollectionFilters.css";

interface CollectionFiltersProps {
    filters: CollectionFiltersState;
    isOpen: boolean;
    hasActiveFilters: boolean;
    onCategoryChange: (
        category: ProductCategory | "all",
    ) => void;
    onMaterialChange: (
        material: ProductMaterial | "all",
    ) => void;
    onReset: () => void;
    onClose: () => void;
}

const categories: {
    label: string;
    value: ProductCategory | "all";
}[] = [
    {
        label: "전체",
        value: "all",
    },
    {
        label: "웨딩 밴드",
        value: "wedding-band",
    },
    {
        label: "인게이지먼트 링",
        value: "engagement-ring",
    },
    {
        label: "커플링",
        value: "couple-ring",
    },
];

const materials: {
    label: string;
    value: ProductMaterial | "all";
}[] = [
    {
        label: "전체",
        value: "all",
    },
    {
        label: "14K Gold",
        value: "14k",
    },
    {
        label: "18K Gold",
        value: "18k",
    },
    {
        label: "Platinum",
        value: "platinum",
    },
];

export default function CollectionFilters({
                                              filters,
                                              isOpen,
                                              hasActiveFilters,
                                              onCategoryChange,
                                              onMaterialChange,
                                              onReset,
                                              onClose,
                                          }: CollectionFiltersProps) {
    return (
        <aside
            className={`collection-filters ${
                isOpen ? "collection-filters--open" : ""
            }`}
            aria-label="제품 필터"
        >
            <header className="collection-filters__mobile-header">
                <strong>Filter</strong>

                <button
                    type="button"
                    aria-label="필터 닫기"
                    onClick={onClose}
                >
                    <X size={20} aria-hidden="true" />
                </button>
            </header>

            <fieldset className="collection-filters__group">
                <legend>Category</legend>

                {categories.map((category) => (
                    <label key={category.value}>
                        <input
                            type="radio"
                            name="category"
                            value={category.value}
                            checked={
                                filters.category === category.value
                            }
                            onChange={() => {
                                onCategoryChange(category.value);
                            }}
                        />

                        <span>{category.label}</span>
                    </label>
                ))}
            </fieldset>

            <fieldset className="collection-filters__group">
                <legend>Material</legend>

                {materials.map((material) => (
                    <label key={material.value}>
                        <input
                            type="radio"
                            name="material"
                            value={material.value}
                            checked={
                                filters.material === material.value
                            }
                            onChange={() => {
                                onMaterialChange(material.value);
                            }}
                        />

                        <span>{material.label}</span>
                    </label>
                ))}
            </fieldset>

            <button
                type="button"
                className="collection-filters__reset"
                disabled={!hasActiveFilters}
                onClick={onReset}
            >
                <RotateCcw size={14} aria-hidden="true" />
                필터 초기화
            </button>

            <button
                type="button"
                className="collection-filters__apply"
                onClick={onClose}
            >
                제품 보기
            </button>
        </aside>
    );
}