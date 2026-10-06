import { Outlet } from "react-router-dom";


import "./Layout.css";
import Header from "./components/Header.tsx";

export default function Layout() {
    return (
        <div className="layout">
            <Header />

            <div className="layout__content">
                <Outlet />
            </div>
        </div>
    );
}