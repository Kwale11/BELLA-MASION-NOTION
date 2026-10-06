import type {CustomizationSelections, MaterialId, MetalColorId,} from "../../types/customization";

interface FinishRenderingProfile {
    roughness: number;
    normalScale: number;
    anisotropy: number;
}

const finishRenderingProfiles: Record<string, FinishRenderingProfile> = {
    polished: {
        roughness: 0.12,
        normalScale: 0.03,
        anisotropy: 0,
    },
    matte: {roughness: 0.44, normalScale: 0.16, anisotropy: 0,},
    hairline: {roughness: 0.3, normalScale: 0.24, anisotropy: 0.75,},
    sandblast: {roughness: 0.58, normalScale: 0.32, anisotropy: 0,},
    hammered: {roughness: 0.34, normalScale: 0.5, anisotropy: 0.15,},
};
const metalColors = {
    "yellow-gold": {"14k": "#d5ae62", "18k": "#cda24d", platinum: "#d9dcda",},
    "rose-gold": {"14k": "#c9917d", "18k": "#bd7e69", platinum: "#d9dcda",},
    "white-gold": {"14k": "#d4d2cb", "18k": "#cbc9c2", platinum: "#d9dcda",},
    "platinum-white": {"14k": "#d9dcda", "18k": "#d9dcda", platinum: "#d9dcda",},
} satisfies Record<MetalColorId, Record<MaterialId, string>>;

export function getRingModelUrl(selections: CustomizationSelections,) {
    const shape = selections.shape || "classic-round";
    const width = selections.width || "3mm";
    return `/models/rings/${shape}-${width}.glb`;
}

export function getMetalColor(selections: CustomizationSelections,) {
    const material: MaterialId = selections.material || "18k";
    const color: MetalColorId = material === "platinum" ? "platinum-white" : selections.color || "yellow-gold";
    return (metalColors[color][material] ?? metalColors["yellow-gold"]["18k"]);
}

export function getFinishProfile(finishId: string,): FinishRenderingProfile {
    return (finishRenderingProfiles[finishId] ?? finishRenderingProfiles.polished);
}

export function getFinishTextureUrls(finishId: string,) {
    const finish = finishId || "polished";
    return {
        normalMap: `/textures/rings/${finish}/normal.webp`,
        roughnessMap: `/textures/rings/${finish}/roughness.webp`,
    };
}

export function getRingSizeScale(sizeValue: string,) {
    const size = Number(sizeValue);
    if (!Number.isFinite(size)) {
        return 1;
    }
    const referenceSize = 12;
    return (1 + (size - referenceSize) * 0.006);
}