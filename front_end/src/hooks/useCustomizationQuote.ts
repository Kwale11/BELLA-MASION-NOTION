import { useEffect, useRef, useState } from "react";
import {
    getQuote,
    saveCustomization,
    type Quote,
    type SavedCustomization,
} from "../api/customization";

import type {
    CustomizationSelections,
} from "../pages/customization/types/customization";

export default function useCustomizationQuote(
    selections: CustomizationSelections,
    isComplete: boolean,
) {
    const selectionKey = JSON.stringify(selections);
    const valid = isComplete && selections.engraving.length <= 30;

    const [quoteState, setQuoteState] = useState<{
        key: string;
        data: Quote | null;
        error: string;
    } | null>(null);

    const [saveState, setSaveState] = useState<{
        key: string;
        data: SavedCustomization | null;
        error: string;
    } | null>(null);

    const [saving, setSaving] = useState(false);
    const savingRef = useRef(false);

    useEffect(() => {
        if (!valid) return;

        const controller = new AbortController();

        const timer = window.setTimeout(() => {
            const payload = JSON.parse(
                selectionKey,
            ) as CustomizationSelections;

            getQuote(payload, controller.signal)
                .then((data) => {
                    if (controller.signal.aborted) return;

                    setQuoteState({
                        key: selectionKey,
                        data,
                        error: "",
                    });
                })
                .catch((cause: unknown) => {
                    if (controller.signal.aborted) return;

                    setQuoteState({
                        key: selectionKey,
                        data: null,
                        error: cause instanceof Error
                            ? cause.message
                            : "견적을 불러오지 못했습니다.",
                    });
                });
        }, 300);

        return () => {
            window.clearTimeout(timer);
            controller.abort();
        };
    }, [selectionKey, valid]);

    const currentQuote = valid && quoteState?.key === selectionKey
        ? quoteState
        : null;

    const currentSave = saveState?.key === selectionKey
        ? saveState
        : null;

    const quote = currentQuote?.data ?? null;
    const saved = currentSave?.data ?? null;

    const quoteError = selections.engraving.length > 30
        ? "각인은 30자 이하로 입력해 주세요."
        : currentQuote?.error ?? "";

    const quoting = valid && currentQuote === null;

    async function save() {
        if (!quote || savingRef.current || saved) return;

        savingRef.current = true;
        setSaving(true);
        setSaveState(null);

        // 클릭 시점의 선택값을 저장합니다.
        const key = selectionKey;
        const payload = JSON.parse(key) as CustomizationSelections;

        try {
            const data = await saveCustomization(payload);

            setSaveState({ key, data, error: "" });
        } catch (cause: unknown) {
            setSaveState({
                key,
                data: null,
                error: cause instanceof Error
                    ? cause.message
                    : "저장하지 못했습니다.",
            });
        } finally {
            savingRef.current = false;
            setSaving(false);
        }
    }

    return {
        quote,
        quoting,
        quoteError,
        saved,
        saving,
        saveError: currentSave?.error ?? "",
        save,
    };
}