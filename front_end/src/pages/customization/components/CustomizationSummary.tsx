interface SummaryItem {
    label: string;
    value: string;
}

interface CustomizationSummaryProps {
    items: SummaryItem[];
    completedCount: number;
    totalSteps: number;
    totalPrice: number | null;
    canSave: boolean;
    saving: boolean;
    saved: boolean;
    onSave: () => void;
}

const priceFormatter = new Intl.NumberFormat("ko-KR");

export default function CustomizationSummary({
                                                 items,
                                                 completedCount,
                                                 totalSteps,
                                                 totalPrice,
                                                 canSave,
                                                 saving,
                                                 saved,
                                                 onSave,
                                             }: CustomizationSummaryProps) {
    const progress = totalSteps > 0
        ? (completedCount / totalSteps) * 100
        : 0;

    return (
        <aside className="customization-summary">
            <div className="customization-summary__progress">
                <div>
                    <span>Customization</span>
                    <strong>{completedCount}/{totalSteps}</strong>
                </div>

                <div
                    className="customization-summary__progress-track"
                    aria-label={`선택 진행률 ${Math.round(progress)}%`}
                >
                    <span style={{ width: `${progress}%` }} />
                </div>
            </div>

            <h2>선택 정보</h2>

            <dl>
                {items.map((item) => (
                    <div key={item.label}>
                        <dt>{item.label}</dt>
                        <dd>{item.value || "선택 전"}</dd>
                    </div>
                ))}
            </dl>

            <div className="customization-summary__price">
                <span>예상 금액</span>
                <strong>
                    {totalPrice === null
                        ? "옵션 선택 후 견적 확인"
                        : `${priceFormatter.format(totalPrice)}원`}
                </strong>
                <p>서버에서 계산한 선택 옵션 기준 견적입니다.</p>
            </div>

            <button
                type="button"
                disabled={!canSave}
                onClick={onSave}
            >
                {saving
                    ? "저장 중..."
                    : saved
                        ? "저장 완료"
                        : "디자인 저장"}
            </button>

            <p className="customization-summary__consultation">
                디자인 저장은 주문이나 결제 완료를 의미하지 않습니다.
                최종 제작 가능 여부는 상담 후 확인됩니다.
            </p>
        </aside>
    );
}