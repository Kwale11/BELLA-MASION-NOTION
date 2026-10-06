import type { StoreInformation } from "../types/store";

export const bellaMaisonStore: StoreInformation = {
    name: "벨라메종",
    englishName: "Bella Maison Cheongdam Showroom",

    description:
        "벨라메종 쇼룸에서는 전문 주얼리 컨설턴트와 함께 웨딩링을 직접 착용하고 두 사람만의 주얼리를 상담할 수 있습니다.",

    address: "홍산남로 28 102호",
    addressDetail: " ",

    phone: "0507-1394-2592",
    email: "reservation@bellamaison.co.kr",

    transportation:
        "신시가지 롯데마트에서 도보 약 5분",

    parking:
        "건물 내 주차 가능 · 상담 고객 2시간 무료",

    // 실제 벨라메종 예약 주소로 변경하세요.
    naverReservationUrl: "https://map.naver.com/p/entry/place/1640127932?placePath=%2Fticket%3FadditionalHeight%3D76%26entry%3Dpll%26fromNxList%3Dtrue%26fromPanelNum%3D1%26locale%3Dko%26svcName%3Dmap_pcv5%26timestamp%3D202608241938&placeSearchOption=entry%3Dpll%26fromNxList%3Dtrue&searchType=place&c=15.00,0,0,0,dh",

    // 실제 카카오톡 채널 주소로 변경하세요.
    kakaoChannelUrl: "https://open.kakao.com/o/sNDn10Oi",

    // 실제 네이버 지도 또는 카카오맵 주소로 변경하세요.
    mapUrl: "https://map.naver.com/p/entry/place/1640127932?placePath=%252Fhome%253Fentry%253Dplt&searchType=place&lng=127.1046661&lat=35.8156679&c=15.00,0,0,0,dh",

    businessHours: [
        {
            label: "월요일 – 토요일",
            time: "11:00 – 18:00",
        },
        {
            label: "목요일",
            time: "정기휴무(매주 목요일)",
        },

        {
            label: "일요일",
            time: "14:00 - 18:00",
            description: "사전 예약 고객에 한해 운영합니다.",
        },
        // {
        //     label: "공휴일",
        //     time: "휴무",
        //     closed: true,
        // },
    ],
};