package org.example.back_end.store.application;

import org.example.back_end.store.domain.StoreInformation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StoreService {

    private final StoreInformation information;

    public StoreService(
            @Value("${app.store.name}") String name,
            @Value("${app.store.address}") String address,
            @Value("${app.store.phone}") String phone,
            @Value("${app.store.naver-reservation-url}") String naverUrl,
            @Value("${app.store.kakao-channel-url}") String kakaoUrl,
            @Value("${app.store.map-url}") String mapUrl
    ) {
        information = new StoreInformation(
                name, address, phone, naverUrl, kakaoUrl, mapUrl
        );
    }

    public StoreInformation get() {
        return information;
    }
}