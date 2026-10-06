import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main_page/MainPage.tsx";
import ReservationPage from "../pages/reservation_page/ReservationPage.tsx";
import Layout from "../pages/layout/Layout.tsx";
import CollectionPage from "../pages/collection/CollectionPage.tsx";
import ProductDetailPage from "../pages/product_detail/ProductDetailPage.tsx";
import CustomizationPage from "../pages/customization/CustomizationPage.tsx";
import GlbViewerPage from "../pages/glbviewer/GlbViewerPage.tsx";
import CadViewerPage from "../pages/cadviewer/CadViewerPage.tsx";



export const router = createBrowserRouter([
    {
        element: <Layout />,

        children:   [
            {
                path: "/",
                element: <MainPage />,
            },
            {
                path: "/reservation",
                element: <ReservationPage />,
            },
            {
                path: "/products",
                element: <CollectionPage />,
            },
            {
                path: "/products/:productSlug",
                element: <ProductDetailPage />,
            },
            {
                path: "customize",
                element: <CustomizationPage />,
            },
            {
                path: "/glb-viewer",
                element: <GlbViewerPage />,
            },
            {
                path: "/cad-viewer",
                element: <CadViewerPage />,
            }

        ],
    },
]);