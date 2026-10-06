import {
    useEffect,
    useRef,
    useState,
} from "react";

import SectionLink from "./SectionLink";

import "./css/IntroSection.css";

export default function IntroSection() {
    const sectionRef =
        useRef<HTMLElement | null>(null);

    const [
        isBackgroundVisible,
        setIsBackgroundVisible,
    ] = useState(false);

    useEffect(() => {
        const section =
            sectionRef.current;

        if (!section) {
            return;
        }

        const visibleThreshold = 0.8;

        const observer =
            new IntersectionObserver(
                ([entry]) => {
                    /*
                     * 인트로 영역이 화면에 45% 이상 들어오면
                     * 배경 이미지를 표시합니다.
                     */
                    setIsBackgroundVisible(
                        entry.intersectionRatio >=
                        visibleThreshold,
                    );
                },
                {
                    threshold: [
                        0,
                        visibleThreshold,
                        1,
                    ],
                },
            );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, []);

    const sectionClassName = [
        "intro-section",
        isBackgroundVisible
            ? "intro-section--background-visible"
            : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <section
            ref={sectionRef}
            className={sectionClassName}
        >
            <div className="intro-section__content">
                <p className="intro-section__eyebrow">
                    Bella Maison
                </p>

                <h2>
                    Premium handcrafted
                    <br />
                    wedding jewelry
                </h2>

                <p className="intro-section__description">
                    시간이 지나도 변하지 않는 아름다움과
                    <br />
                    두 사람만의 이야기를 담은 웨딩 주얼리를
                    선보입니다.
                </p>

                <SectionLink href="/about">
                    Read more
                </SectionLink>
            </div>
        </section>
    );
}