import type {
    CustomizationOption,
    MaterialId,
} from "../types/customization";

export const basePrice = 980_000;
import classic from "../../../assets/customize/classic_round.png";
import dome from "../../../assets/customize/dome.png";
import flat from "../../../assets/customize/flat.png";
import wave from "../../../assets/customize/wave.png";
import k14 from "../../../assets/customize/14k.png";
import k18 from "../../../assets/customize/18k.png";
import platinum from "../../../assets/customize/platinum.png";
import rose from "../../../assets/customize/rose_gold_ring.png";
import yellow from "../../../assets/customize/yellow_gold_ring.png";
import white from "../../../assets/customize/white_gold_ring.png";
import ring_2mm from "../../../assets/customize/ring_width_2mm.png";
import ring_3mm from "../../../assets/customize/ring_width_3mm.png";
import ring_4mm from "../../../assets/customize/ring_width_4mm.png";
import ring_5mm from "../../../assets/customize/ring_width_5mm.png";
import glossy from "../../../assets/customize/ring_finish_glossy.png";
import hammerd from "../../../assets/customize/ring_finish_hammered.png";
import matte from "../../../assets/customize/ring_finish_matte.png";
import sandblast from "../../../assets/customize/ring_finish_sandblast.png";
import hairline from "../../../assets/customize/ring_finish_hairline.png";



export const shapeOptions: CustomizationOption[] = [
    {
        id: "classic-round",
        label: "클래식 라운드",
        description: "부드럽고 편안한 기본 웨딩 밴드",
        imageUrl:
            classic,
    },
    {
        id: "flat",
        label: "플랫",
        description: "평평한 표면의 모던한 디자인",
        imageUrl:
            flat,
        priceDelta: 50_000,
    },
    {
        id: "dome",
        label: "돔",
        description: "중앙이 볼록한 클래식 디자인",
        imageUrl:
            dome,
        priceDelta: 80_000,
    },
    {
        id: "wave",
        label: "웨이브",
        description: "유려한 곡선이 들어간 디자인",
        imageUrl:
            wave,
        priceDelta: 150_000,
    },
];

export const materialOptions: CustomizationOption[] = [
    {
        id: "14k",
        label: "14K Gold",
        description: "내구성과 실용성이 좋은 골드",
        imageUrl:
            k14,
    },
    {
        id: "18k",
        label: "18K Gold",
        description: "풍부한 색감과 높은 골드 함량",
        imageUrl:
            k18,
        priceDelta: 280_000,
    },
    {
        id: "platinum",
        label: "Platinum",
        description: "묵직하고 고급스러운 백색 귀금속",
        imageUrl:
        platinum,
        priceDelta: 520_000,
    },
];

export const colorOptions: CustomizationOption[] = [
    {
        id: "yellow-gold",
        label: "옐로 골드",
        description: "따뜻하고 클래식한 골드 컬러",
        imageUrl:
            yellow,
        availableFor: ["14k", "18k"],
    },
    {
        id: "rose-gold",
        label: "로즈 골드",
        description: "은은한 분홍빛의 부드러운 컬러",
        imageUrl:
            rose,
        availableFor: ["14k", "18k"],
    },
    {
        id: "white-gold",
        label: "화이트 골드",
        description: "정제되고 현대적인 백색 골드",
        imageUrl:
            white,
        priceDelta: 70_000,
        availableFor: ["14k", "18k"],
    },
    {
        id: "platinum-white",
        label: "플래티넘 화이트",
        description: "플래티넘 고유의 깊은 백색",
        imageUrl:
            "/images/customization/color/platinum-white.webp",
        availableFor: ["platinum"],
    },
];

export const widthOptions: CustomizationOption[] = [
    {
        id: "2mm",
        label: "2.0mm",
        description: "가볍고 섬세한 슬림 밴드",
        imageUrl:
            ring_2mm,
    },
    {
        id: "3mm",
        label: "3.0mm",
        description: "균형 잡힌 기본 웨딩 밴드",
        imageUrl:
        ring_3mm,
        priceDelta: 80_000,
    },
    {
        id: "4mm",
        label: "4.0mm",
        description: "적당한 존재감을 가진 밴드",
        imageUrl:
        ring_4mm,
        priceDelta: 160_000,
    },
    {
        id: "5mm",
        label: "5.0mm",
        description: "볼드하고 선명한 인상의 밴드",
        imageUrl:
        ring_5mm,
        priceDelta: 260_000,
    },
];

export const finishOptions: CustomizationOption[] = [
    {
        id: "polished",
        label: "유광",
        description: "거울처럼 선명하게 반사되는 표면",
        imageUrl:
            glossy,
    },
    {
        id: "matte",
        label: "무광",
        description: "차분하고 부드러운 표면",
        imageUrl:
            matte,
        priceDelta: 40_000,
    },
    {
        id: "hairline",
        label: "헤어라인",
        description: "한 방향으로 흐르는 섬세한 결",
        imageUrl:
            hairline,
        priceDelta: 70_000,
    },
    {
        id: "sandblast",
        label: "샌드블라스트",
        description: "미세한 입자가 느껴지는 표면",
        imageUrl:
            sandblast,
        priceDelta: 90_000,
    },
    {
        id: "hammered",
        label: "해머드",
        description: "수공예로 두드린 듯한 입체적인 질감",
        imageUrl:
            hammerd,
        priceDelta: 140_000,
    },
];

export const sizeOptions = Array.from(
    { length: 31 },
    (_, index) => {
        const size = index + 1;

        return {
            value: String(size),
            label: `${size}호`,
        };
    },
);

export function getAvailableColors(
    material: MaterialId | "",
): CustomizationOption[] {
    if (!material) {
        return [];
    }

    return colorOptions.filter((option) =>
        option.availableFor?.includes(material),
    );
}

export const customizationSteps = [
    "shape",
    "material",
    "color",
    "width",
    "finish",
    "size",
] as const;