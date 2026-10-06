package org.example.back_end.customization.domain;

import java.util.List;

public record Quote(
        long basePrice,
        List<PriceItem> items,
        long totalPrice,
        String currency,
        String modelUrl
) {
    public record PriceItem(
            String category,
            String optionId,
            long priceDelta
    ) {}
}