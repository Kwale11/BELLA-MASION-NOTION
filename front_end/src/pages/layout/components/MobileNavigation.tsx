import { ArrowRight } from "lucide-react";

import type { NavigationItem } from "../../../types/navigation.ts";

import "./css/MobileNavigation.css";

interface MobileNavigationProps {
    isOpen: boolean;
    items: NavigationItem[];
    onNavigate: () => void;
}

export default function MobileNavigation({
                                             isOpen,
                                             items,
                                             onNavigate,
                                         }: MobileNavigationProps) {
    return (
        <nav
            id="mobile-navigation"
            className={`mobile-navigation ${
                isOpen ? "mobile-navigation--open" : ""
            }`}
            aria-label="모바일 메뉴"
            aria-hidden={!isOpen}
        >
            {items.map((item) => (
                <a
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                >
                    <span>{item.label}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                </a>
            ))}
        </nav>
    );
}