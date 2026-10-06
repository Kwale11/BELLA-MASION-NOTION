import HeroSection from "./components/HeroSection";
// import IntroSection from "./components/IntroSection";
import NewArrivalsSection from "./components/NewArrivalsSection";

import "./MainPage.css";

export default function MainPage() {
    return (
        <main className="main-page">
            <HeroSection />

            <div className="main-page__foreground">
                {/*<IntroSection />*/}
                <NewArrivalsSection />
            </div>
        </main>
    );
}