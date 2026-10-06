interface EngravingSectionProps {
    value: string;
    onChange: (value: string) => void;
}

const maximumLength = 20;

export default function EngravingSection({
                                             value,
                                             onChange,
                                         }: EngravingSectionProps) {
    return (
        <section className="customization-section">
            <header className="customization-section__header">
                <span>07</span>

                <div>
                    <h2>각인</h2>
                    <p>
                        반지 안쪽에 새길 문구를 입력해주세요.
                    </p>
                </div>
            </header>

            <div className="engraving-panel">
                <div className="engraving-panel__preview">
                    <img
                        src="/images/customization/engraving/inside-engraving.webp"
                        alt="반지 안쪽 각인 참고 이미지"
                    />

                    <p>
                        {value || "Always with you"}
                    </p>
                </div>

                <div className="engraving-panel__form">
                    <label htmlFor="ring-engraving">
                        각인 문구
                    </label>

                    <input
                        id="ring-engraving"
                        type="text"
                        value={value}
                        maxLength={maximumLength}
                        placeholder="예: J & H · 2026.10.24"
                        onChange={(event) => {
                            onChange(event.target.value);
                        }}
                    />

                    <div>
                        <span>
                            한글, 영문, 숫자 및 일부 특수문자
                        </span>

                        <span>
                            {value.length}/{maximumLength}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}