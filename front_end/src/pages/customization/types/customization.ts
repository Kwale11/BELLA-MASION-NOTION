export type MaterialId = | "14k" | "18k" | "platinum";
export type MetalColorId = | "yellow-gold" | "rose-gold" | "white-gold" | "platinum-white";

export interface CustomizationOption {
    id: string;
    label: string;
    description: string;
    imageUrl: string;
    priceDelta?: number;
    availableFor?: MaterialId[];
}

export interface CustomizationSelections {
    shape: string;
    material: MaterialId | "";
    color: MetalColorId | "";
    width: string;
    finish: string;
    size: string;
    engraving: string;
}