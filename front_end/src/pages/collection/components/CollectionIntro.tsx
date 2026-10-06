import { Link } from "react-router-dom";

import "./css/CollectionIntro.css";

export default function CollectionIntro() {
    return (
        <section className="collection-intro">
            <nav
                className="collection-intro__breadcrumb"
                aria-label="현재 위치"
            >
                <Link to="/">Home</Link>
                <span>/</span>
                <span>Collection</span>
            </nav>

            <div className="collection-intro__content">
                <p>Discover Bella Maison</p>

                <h1>The Collection</h1>

                <span>
          두 사람의 약속과 이야기를 오래도록 간직할
          <br />
          벨라메종의 웨딩 주얼리를 만나보세요.
        </span>
            </div>
        </section>
    );
}