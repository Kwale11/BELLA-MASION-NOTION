import { useState } from "react";
import {
    Menu,
    Search,
    ShoppingBag,
    X,
} from "lucide-react";

import { mainNavigationItems } from "../../../data/navigation.ts";
import MobileNavigation from "./MobileNavigation.tsx";

import "./css/Header.css";
import {Link} from "react-router-dom";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((previous) => !previous);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className="main-header">
                <button
                    type="button"
                    className="main-header__menu-button"
                    aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? (
                        <X size={20} aria-hidden="true" />
                    ) : (
                        <Menu size={20} aria-hidden="true" />
                    )}

                    <span>MENU</span>
                </button>

                <div className="main-header__center">
                    <Link
                        to="/"
                        className="main-header__logo"
                        aria-label="벨라메종 홈"
                    >
                        <strong>BELLA MAISON</strong>
                        <span>WEDDING JEWELRY</span>
                    </Link>

                    <nav
                        className="main-header__navigation"
                        aria-label="주요 메뉴"
                    >
                        {mainNavigationItems.map((item) => (
                            <a key={item.href} href={item.href}>
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="main-header__actions">
                    <button type="button" aria-label="상품 검색">
                        <Search size={19} aria-hidden="true" />
                    </button>

                    <a href="/cart" aria-label="장바구니">
                        <ShoppingBag size={19} aria-hidden="true" />

                        <span className="main-header__cart-count">
              0
            </span>
                    </a>
                </div>
            </header>

            <MobileNavigation
                isOpen={isMenuOpen}
                items={mainNavigationItems}
                onNavigate={closeMenu}
            />
        </>
    );
}