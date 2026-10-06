import { Check } from "lucide-react";

import type { CustomizationOption } from "../types/customization";

interface VisualOptionSectionProps {
    step: number;
    title: string;
    description: string;
    options: CustomizationOption[];
    selectedId: string;
    disabled?: boolean;
    onSelect: (optionId: string) => void;
}

const priceFormatter = new Intl.NumberFormat("ko-KR");

export default function VisualOptionSection({
                                                step,
                                                title,
                                                description,
                                                options,
                                                selectedId,
                                                disabled = false,
                                                onSelect,
                                            }: VisualOptionSectionProps) {
    return (
        <section className="customization-section">
            <header className="customization-section__header">
                <span>{String(step).padStart(2, "0")}</span>

                <div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </header>

            {disabled ? (
                <div className="customization-section__notice">
                    소재를 먼저 선택해주세요.
                </div>
            ) : (
                <div className="customization-option-grid">
                    {options.map((option) => {
                        const isSelected =
                            selectedId === option.id;

                        return (
                            <button
                                key={option.id}
                                type="button"
                                className={`customization-option ${
                                    isSelected
                                        ? "customization-option--selected"
                                        : ""
                                }`}
                                aria-pressed={isSelected}
                                onClick={() => {
                                    onSelect(option.id);
                                }}
                            >
                                <div className="customization-option__image">
                                    <img
                                        src={option.imageUrl}
                                        alt={`${option.label} 참고 이미지`}
                                        loading="lazy"
                                    />

                                    <span className="customization-option__check">
                                        <Check
                                            size={15}
                                            aria-hidden="true"
                                        />
                                    </span>
                                </div>

                                <div className="customization-option__content">
                                    <div>
                                        <strong>
                                            {option.label}
                                        </strong>

                                        {option.priceDelta ? (
                                            <span>
                                                +
                                                {priceFormatter.format(
                                                    option.priceDelta,
                                                )}
                                                원
                                            </span>
                                        ) : (
                                            <span>기본</span>
                                        )}
                                    </div>

                                    <p>
                                        {option.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
        </section>
    );
}