import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import "./css/SectionLink.css";

interface SectionLinkProps {
    href: string;
    children: string;
    theme?: "light" | "dark";
}

export default function SectionLink({
                                        href,
                                        children,
                                        theme = "dark",
                                    }: SectionLinkProps) {
    return (
        <Link
            to={href}
            className={`section-link section-link--${theme}`}
        >
            <span>{children}</span>
            <ArrowRight size={16} aria-hidden="true" />
        </Link>
    );
}