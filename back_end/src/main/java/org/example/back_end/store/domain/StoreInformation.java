package org.example.back_end.store.domain;

public record StoreInformation(
        String name,
        String address,
        String phone,
        String naverReservationUrl,
        String kakaoChannelUrl,
        String mapUrl
) {}