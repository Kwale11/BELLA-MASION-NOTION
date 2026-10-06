import { useMemo, useState } from "react";

import CustomizationSummary from "./components/CustomizationSummary";
import EngravingSection from "./components/EngravingSection";
import RingSizeSection from "./components/RingSizeSection";
import VisualOptionSection from "./components/VisualOptionSection";
import RingPreview3D from "./components/ring-3d/RingPreview3D";

import useApi from "../../hooks/useApi";
import useCustomizationQuote from "../../hooks/useCustomizationQuote";

import {
    toDisplayOptions,
    type RingOptionsResponse,
} from "../../api/customization";

import type {
    CustomizationOption,
    CustomizationSelections,
    MaterialId,
    MetalColorId,
} from "./types/customization";

import "./CustomizationPage.css";

const TOTAL_STEPS = 6;

const initialSelections: CustomizationSelections = {
    shape: "",
    material: "",
    color: "",
    width: "",
    finish: "",
    size: "",
    engraving: "",
};

function findOption(
    options: CustomizationOption[],
    selectedId: string,
) {
    return options.find((option) => option.id === selectedId);
}

function isMaterialId(value: string): value is MaterialId {
    return (
        value === "14k" ||
        value === "18k" ||
        value === "platinum"
    );
}

function isMetalColorId(value: string): value is MetalColorId {
    return (
        value === "yellow-gold" ||
        value === "rose-gold" ||
        value === "white-gold" ||
        value === "platinum-white"
    );
}

export default function CustomizationPage() {
    const {
        data,
        loading,
        error,
    } = useApi<RingOptionsResponse>(
        "/api/customization/options",
    );

    if (loading) {
        return (
            <main className="customization-page">
                <div
                    className="customization-page__3d-loading"
                    role="status"
                >
                    커스터마이징 옵션을 불러오는 중입니다.
                </div>
            </main>
        );
    }

    if (error || !data) {
        return (
            <main className="customization-page">
                <div className="customization-page__hero">
                    <h1>옵션을 불러오지 못했습니다.</h1>

                    <p role="alert">
                        {error?.message ??
                            "커스터마이징 옵션이 없습니다."}
                    </p>
                </div>
            </main>
        );
    }

    return <CustomizationForm options={data} />;
}

interface CustomizationFormProps {
    options: RingOptionsResponse;
}

function CustomizationForm({
                               options,
                           }: CustomizationFormProps) {
    const [selections, setSelections] =
        useState<CustomizationSelections>(initialSelections);

    const {
        shapeOptions,
        materialOptions,
        colorOptions,
        widthOptions,
        finishOptions,
        sizeOptions,
    } = useMemo(
        () => toDisplayOptions(options),
        [options],
    );

    const availableColors = useMemo(() => {
        const material = selections.material;

        if (!material) {
            return [];
        }

        return colorOptions.filter((option) =>
            option.availableFor?.includes(material),
        );
    }, [colorOptions, selections.material]);

    const selectedShape = findOption(
        shapeOptions,
        selections.shape,
    );

    const selectedMaterial = findOption(
        materialOptions,
        selections.material,
    );

    const selectedColor = findOption(
        availableColors,
        selections.color,
    );

    const selectedWidth = findOption(
        widthOptions,
        selections.width,
    );

    const selectedFinish = findOption(
        finishOptions,
        selections.finish,
    );

    const selectedSize = sizeOptions.find(
        (option) => option.value === selections.size,
    );

    // 서버에서 제공한 옵션에 실제로 포함된 선택만 완료로 계산합니다.
    const completedCount = [
        selectedShape,
        selectedMaterial,
        selectedColor,
        selectedWidth,
        selectedFinish,
        selectedSize,
    ].filter(Boolean).length;

    const isComplete = completedCount === TOTAL_STEPS;

    const {
        quote,
        quoting,
        quoteError,
        saved,
        saving,
        saveError,
        save,
    } = useCustomizationQuote(
        selections,
        isComplete,
    );

    const canSave =
        isComplete &&
        quote !== null &&
        !quoting &&
        !quoteError &&
        !saving &&
        saved === null;

    function updateSelection<
        Key extends keyof CustomizationSelections,
    >(
        key: Key,
        value: CustomizationSelections[Key],
    ) {
        if (saving) {
            return;
        }

        setSelections((previous) => ({
            ...previous,
            [key]: value,
        }));
    }

    function handleMaterialChange(value: string) {
        if (
            saving ||
            !isMaterialId(value) ||
            !findOption(materialOptions, value)
        ) {
            return;
        }

        setSelections((previous) => {
            if (previous.material === value) {
                return previous;
            }

            return {
                ...previous,
                material: value,
                color: "",
            };
        });
    }

    function handleColorChange(value: string) {
        if (
            !isMetalColorId(value) ||
            !findOption(availableColors, value)
        ) {
            return;
        }

        updateSelection("color", value);
    }

    function handleSave() {
        if (!canSave) {
            return;
        }

        void save();
    }

    const summaryItems = [
        {
            label: "형태",
            value: selectedShape?.label ?? "",
        },
        {
            label: "소재",
            value: selectedMaterial?.label ?? "",
        },
        {
            label: "색상",
            value: selectedColor?.label ?? "",
        },
        {
            label: "너비",
            value: selectedWidth?.label ?? "",
        },
        {
            label: "표면",
            value: selectedFinish?.label ?? "",
        },
        {
            label: "사이즈",
            value: selectedSize?.label ?? "",
        },
        {
            label: "각인",
            value: selections.engraving || "없음",
        },
    ];

    return (
        <main className="customization-page">
            <header className="customization-page__hero">
                <p>BELLA MAISON CUSTOM MADE</p>

                <h1>
                    두 사람만의 반지를
                    <br />
                    완성해보세요.
                </h1>

                <span>
                    이미지로 디자인을 비교하고 원하는 옵션을
                    선택하며 반지를 완성할 수 있습니다.
                </span>
            </header>

            <div className="customization-page__layout">
                <div className="customization-page__left">
                    <div className="ring-preview-sticky">
                        <RingPreview3D selections={selections} />

                        <CustomizationSummary
                            items={summaryItems}
                            completedCount={completedCount}
                            totalSteps={TOTAL_STEPS}
                            totalPrice={quote?.totalPrice ?? null}
                            canSave={canSave}
                            saving={saving}
                            saved={saved !== null}
                            onSave={handleSave}
                        />

                        <div aria-live="polite">
                            {!isComplete && (
                                <p>
                                    필수 옵션 {TOTAL_STEPS}개를
                                    선택하면 견적을 확인할 수 있습니다.
                                </p>
                            )}

                            {quoting && (
                                <p role="status">
                                    견적을 계산하는 중입니다.
                                </p>
                            )}

                            {saving && (
                                <p role="status">
                                    디자인을 저장하는 중입니다.
                                </p>
                            )}

                            {saved && (
                                <div role="status">
                                    <p>
                                        디자인이 저장되었습니다.
                                    </p>

                                    <p
                                        style={{
                                            overflowWrap: "anywhere",
                                        }}
                                    >
                                        저장 번호: {saved.id}
                                    </p>

                                    <p>
                                        저장 금액:{" "}
                                        {saved.totalPrice.toLocaleString(
                                            "ko-KR",
                                        )}
                                        원
                                    </p>
                                </div>
                            )}
                        </div>

                        {quoteError && (
                            <p
                                role="alert"
                                style={{ whiteSpace: "pre-line" }}
                            >
                                {quoteError}
                            </p>
                        )}

                        {saveError && (
                            <p
                                role="alert"
                                style={{ whiteSpace: "pre-line" }}
                            >
                                {saveError}
                            </p>
                        )}
                    </div>
                </div>

                <fieldset
                    className="customization-page__right"
                    disabled={saving}
                    aria-label="반지 커스터마이징 옵션"
                    aria-busy={saving}
                    style={{
                        border: 0,
                        padding: 0,
                        margin: 0,
                        minWidth: 0,
                    }}
                >
                    <VisualOptionSection
                        step={1}
                        title="반지 형태"
                        description="전체적인 반지 형태를 선택해주세요."
                        options={shapeOptions}
                        selectedId={selections.shape}
                        onSelect={(value) => {
                            updateSelection("shape", value);
                        }}
                    />

                    <VisualOptionSection
                        step={2}
                        title="소재"
                        description="착용감과 색감, 무게를 결정하는 소재입니다."
                        options={materialOptions}
                        selectedId={selections.material}
                        onSelect={handleMaterialChange}
                    />

                    <VisualOptionSection
                        step={3}
                        title="색상"
                        description="선택한 소재에서 사용 가능한 색상입니다."
                        options={availableColors}
                        selectedId={selections.color}
                        disabled={!selections.material}
                        onSelect={handleColorChange}
                    />

                    <VisualOptionSection
                        step={4}
                        title="반지 너비"
                        description="손 위에서 느껴지는 반지의 존재감을 선택해주세요."
                        options={widthOptions}
                        selectedId={selections.width}
                        onSelect={(value) => {
                            updateSelection("width", value);
                        }}
                    />

                    <VisualOptionSection
                        step={5}
                        title="표면 마감"
                        description="빛이 반사되는 방식과 표면의 질감을 선택해주세요."
                        options={finishOptions}
                        selectedId={selections.finish}
                        onSelect={(value) => {
                            updateSelection("finish", value);
                        }}
                    />

                    <RingSizeSection
                        value={selections.size}
                        options={sizeOptions}
                        onChange={(value) => {
                            updateSelection("size", value);
                        }}
                    />

                    <EngravingSection
                        value={selections.engraving}
                        onChange={(value) => {
                            updateSelection("engraving", value);
                        }}
                    />
                </fieldset>
            </div>
        </main>
    );
}