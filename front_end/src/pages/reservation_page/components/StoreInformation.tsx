import {
    Car,
    Clock3,
    Mail,
    MapPin,
    Navigation,
    Phone,
    TrainFront,
} from "lucide-react";

import type { StoreInformation as StoreInformationType } from "../types/store";

import "./css/StoreInformation.css";

interface StoreInformationProps {
    store: StoreInformationType;
}

export default function StoreInformation({
                                             store,
                                         }: StoreInformationProps) {
    return (
        <section
            className="store-information"
            aria-labelledby="store-information-title"
        >
            <header className="store-information__heading">
                <p>Showroom information</p>

                <h2 id="store-information-title">
                    {store.name}
                </h2>

                <span>{store.englishName}</span>
            </header>

            <div className="store-information__layout">
                <div className="store-information__introduction">
                    <p>{store.description}</p>

                    <a
                        href={store.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Navigation size={15} aria-hidden="true" />
                        <span>지도에서 위치 확인</span>
                    </a>
                </div>

                <div className="store-information__details">
                    <section className="store-information__group">
                        <h3>위치 및 연락처</h3>

                        <dl className="store-information__list">
                            <div>
                                <dt>
                                    <MapPin size={17} aria-hidden="true" />
                                    <span>주소</span>
                                </dt>

                                <dd>
                                    {store.address}
                                    <br />
                                    {store.addressDetail}
                                </dd>
                            </div>

                            <div>
                                <dt>
                                    <Phone size={17} aria-hidden="true" />
                                    <span>전화</span>
                                </dt>

                                <dd>
                                    <a
                                        href={`tel:${store.phone.replaceAll("-", "")}`}
                                    >
                                        {store.phone}
                                    </a>
                                </dd>
                            </div>

                            <div>
                                <dt>
                                    <Mail size={17} aria-hidden="true" />
                                    <span>이메일</span>
                                </dt>

                                <dd>
                                    <a href={`mailto:${store.email}`}>
                                        {store.email}
                                    </a>
                                </dd>
                            </div>

                            <div>
                                <dt>
                                    <TrainFront size={17} aria-hidden="true" />
                                    <span>대중교통</span>
                                </dt>

                                <dd>{store.transportation}</dd>
                            </div>

                            <div>
                                <dt>
                                    <Car size={17} aria-hidden="true" />
                                    <span>주차</span>
                                </dt>

                                <dd>{store.parking}</dd>
                            </div>
                        </dl>
                    </section>

                    <section className="store-information__group">
                        <h3>
                            <Clock3 size={18} aria-hidden="true" />
                            운영시간
                        </h3>

                        <dl className="business-hours">
                            {store.businessHours.map((businessHour) => (
                                <div key={businessHour.label}>
                                    <dt>{businessHour.label}</dt>

                                    <dd
                                        className={
                                            businessHour.closed
                                                ? "business-hours__closed"
                                                : undefined
                                        }
                                    >
                                        <strong>{businessHour.time}</strong>

                                        {businessHour.description && (
                                            <span>{businessHour.description}</span>
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <p className="store-information__notice">
                            상담 상황에 따라 운영시간이 변경될 수 있으므로
                            방문 전 예약을 권장합니다.
                        </p>
                    </section>
                </div>
            </div>
        </section>
    );
}