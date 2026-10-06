export interface BusinessHour {
    label: string;
    time: string;
    description?: string;
    closed?: boolean;
}

export interface StoreInformation {
    name: string;
    englishName: string;
    description: string;
    address: string;
    addressDetail: string;
    phone: string;
    email: string;
    transportation: string;
    parking: string;
    naverReservationUrl: string;
    kakaoChannelUrl: string;
    mapUrl: string;
    businessHours: BusinessHour[];
}