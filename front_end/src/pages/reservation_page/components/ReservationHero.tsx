import { MapPin } from "lucide-react";

import type { StoreInformation } from "../types/store";

import reservationImage from "../../../assets/벨라메종 예약3.png";

import "./css/ReservationHero.css";

interface ReservationHeroProps {
    store: StoreInformation;
}

export default function ReservationHero({
                                            store,
                                        }: ReservationHeroProps) {
    return (
        <section className="reservation-hero">
            <img
                className="reservation-hero__image"
                src={reservationImage}
                alt={`${store.name} 매장 내부`}
            />

            <div
                className="reservation-hero__overlay"
                aria-hidden="true"
            />

            <div className="reservation-hero__content">
                <p className="reservation-hero__eyebrow">
                    Visit our showroom
                </p>

                <h1>Reservation</h1>

                <p className="reservation-hero__description">
                    두 사람의 특별한 순간을 위한
                    <br />
                    프라이빗 주얼리 상담을 예약하세요.
                </p>

                <div className="reservation-hero__location">
                    <MapPin size={15} aria-hidden="true" />
                    <span>{store.name}</span>
                </div>
            </div>
        </section>
    );
}