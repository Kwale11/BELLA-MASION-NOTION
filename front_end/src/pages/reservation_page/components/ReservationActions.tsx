import {
    CalendarDays,
    MessageCircle,
    Phone,
} from "lucide-react";

import type { StoreInformation } from "../types/store";

import "./css/ReservationActions.css";

interface ReservationActionsProps {
    store: StoreInformation;
}

export default function ReservationActions({
                                               store,
                                           }: ReservationActionsProps) {
    return (
        <section
            className="reservation-actions"
            aria-labelledby="reservation-actions-title"
        >
            <header className="reservation-actions__header">
                <p>Consultation</p>
                <h2 id="reservation-actions-title">
                    상담 및 방문 예약
                </h2>

                <span>
          보다 편안한 상담을 위해 방문 전 예약을 권장합니다.
        </span>
            </header>

            <div className="reservation-actions__grid">
                <a
                    href={store.naverReservationUrl}
                    className="
            reservation-actions__item
            reservation-actions__item--naver
          "
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className="reservation-actions__icon">
                        <CalendarDays size={22} aria-hidden="true" />
                    </div>

                    <div>
                        <strong>네이버 예약</strong>
                        <span>원하는 날짜와 시간을 선택하세요.</span>
                    </div>
                </a>

                <a
                    href={`tel:${store.phone.replaceAll("-", "")}`}
                    className="
            reservation-actions__item
            reservation-actions__item--phone
          "
                >
                    <div className="reservation-actions__icon">
                        <Phone size={22} aria-hidden="true" />
                    </div>

                    <div>
                        <strong>전화 문의</strong>
                        <span>{store.phone}</span>
                    </div>
                </a>

                <a
                    href="https://open.kakao.com/o/sNDn10Oi"
                    className="
            reservation-actions__item
            reservation-actions__item--kakao
          "
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className="reservation-actions__icon">
                        <MessageCircle size={22} aria-hidden="true" />
                    </div>


                    <div>
                        <strong>카카오톡 문의</strong>
                        <span>채널 상담을 통해 문의하세요.</span>
                    </div>
                </a>
            </div>
        </section>
    );
}