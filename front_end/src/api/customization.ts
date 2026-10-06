import { request } from "./http";
import * as visuals from "../pages/customization/data/customizationOptions";

import type {
    CustomizationOption,
    CustomizationSelections,
    MaterialId,
} from "../pages/customization/types/customization";

interface ApiOption {
    id: string;
    label: string;
    priceDelta: number;
    availableFor: MaterialId[];
}

export interface RingOptionsResponse {
    basePrice: number;
    shapeOptions: ApiOption[];
    materialOptions: ApiOption[];
    colorOptions: ApiOption[];
    widthOptions: ApiOption[];
    finishOptions: ApiOption[];
    sizeOptions: { value: string; label: string }[];
}

export interface Quote {
    basePrice: number;
    items: {
        category: string;
        optionId: string;
        priceDelta: number;
    }[];
    totalPrice: number;
    currency: string;
    modelUrl: string;
}

export interface SavedCustomization {
    id: string;
    selections: CustomizationSelections;
    totalPrice: number;
    currency: string;
    createdAt: string;
}

function mergeVisuals(
    serverOptions: ApiOption[],
    localOptions: CustomizationOption[],
): CustomizationOption[] {
    return serverOptions.map((option) => {
        const local = localOptions.find((item) => item.id === option.id);

        return {
            id: option.id,
            label: option.label,
            priceDelta: option.priceDelta,
            availableFor: option.availableFor,
            description: local?.description ?? "",
            imageUrl: local?.imageUrl ?? "/favicon.svg",
        };
    });
}

export function toDisplayOptions(response: RingOptionsResponse) {
    const localColors = [
        ...visuals.getAvailableColors("14k"),
        ...visuals.getAvailableColors("18k"),
        ...visuals.getAvailableColors("platinum"),
    ];

    return {
        shapeOptions: mergeVisuals(response.shapeOptions, visuals.shapeOptions),
        materialOptions: mergeVisuals(
            response.materialOptions,
            visuals.materialOptions,
        ),
        colorOptions: mergeVisuals(response.colorOptions, localColors),
        widthOptions: mergeVisuals(response.widthOptions, visuals.widthOptions),
        finishOptions: mergeVisuals(
            response.finishOptions,
            visuals.finishOptions,
        ),
        sizeOptions: response.sizeOptions,
    };
}

export function getQuote(
    selections: CustomizationSelections,
    signal?: AbortSignal,
) {
    return request<Quote>("/api/customization/quote", {
        method: "POST",
        body: JSON.stringify(selections),
        signal,
    });
}

export function saveCustomization(
    selections: CustomizationSelections,
) {
    return request<SavedCustomization>("/api/customizations", {
        method: "POST",
        body: JSON.stringify(selections),
    });
}