interface SizeOption {
    value: string;
    label: string;
}

interface RingSizeSectionProps {
    value: string;
    options: SizeOption[];
    onChange: (value: string) => void;
}

export default function RingSizeSection({
                                            value,
                                            options,
                                            onChange,
                                        }: RingSizeSectionProps) {
    return (
        <section className="customization-section">
            <header className="customization-section__header">
                <span>06</span>

                <div>
                    <h2>반지 사이즈</h2>
                    <p>
                        착용할 손가락의 사이즈를 선택해주세요.
                    </p>
                </div>
            </header>

            <div className="ring-size-panel">
                <div className="ring-size-panel__visual">
                    <img
                        src="/images/customization/size/ring-size-guide.webp"
                        alt="반지 사이즈 측정 참고 이미지"
                    />
                </div>

                <div className="ring-size-panel__form">
                    <label htmlFor="ring-size">
                        반지 호수
                    </label>

                    <select
                        id="ring-size"
                        value={value}
                        onChange={(event) => {
                            onChange(event.target.value);
                        }}
                    >
                        <option value="">
                            사이즈를 선택해주세요
                        </option>

                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <button type="button">
                        사이즈를 모르시나요?
                    </button>

                    <p>
                        정확한 제작을 위해 매장 측정 또는 링
                        게이지 대여를 권장합니다.
                    </p>
                </div>
            </div>
        </section>
    );
}