import useApi from "../../hooks/useApi";

import ReservationActions from "./components/ReservationActions";
import ReservationHero from "./components/ReservationHero";
import StoreInformation from "./components/StoreInformation";
import { bellaMaisonStore } from "./data/store";
import type {
    StoreInformation as StoreInfo,
} from "./types/store";

import "./ReservationPage.css";

type ApiStore = Pick<
    StoreInfo,
    | "name"
    | "address"
    | "phone"
    | "naverReservationUrl"
    | "kakaoChannelUrl"
    | "mapUrl"
>;

export default function ReservationPage() {
    const { data, loading, error } = useApi<ApiStore>("/api/store");

    if (loading) {
        return <main><p role="status">매장 정보를 불러오는 중입니다.</p></main>;
    }

    if (error || !data) {
        return (
            <main>
                <p role="alert">
                    {error?.message ?? "매장 정보가 없습니다."}
                </p>
            </main>
        );
    }

    const store: StoreInfo = {
        ...bellaMaisonStore,
        ...data,
    };

    return (
        <main className="reservation-page">
            <ReservationHero store={store} />
            <ReservationActions store={store} />
            <StoreInformation store={store} />
        </main>
    );
}