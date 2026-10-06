// import SectionLink from "./SectionLink";

import "./css/HeroSection.css";

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div
                className="hero-section__background"
                aria-hidden="true"
            />

            <div
                className="hero-section__overlay"
                aria-hidden="true"
            />



            <div className="hero-section__content">
                <p className="hero-section__eyebrow">
                    A promise, beautifully made
                </p>

                <h1>
                    For your
                    <br />
                    forever moment
                </h1>

                <p className="hero-section__description">
                    두 사람의 이야기를 담아
                    <br />
                    오래도록 빛나는 웨딩 주얼리를 완성합니다.
                </p>

                {/*<SectionLink href="/products" theme="light">*/}
                {/*    Explore the collection*/}
                {/*</SectionLink>*/}
            </div>

            <div
                className="hero-section__scroll"
                aria-hidden="true"
            >
                <span>SCROLL</span>
                <div />
            </div>
        </section>
    );
}