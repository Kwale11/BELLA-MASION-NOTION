package org.example.back_end.customization.domain;

import java.time.Instant;
import java.util.UUID;

public record Customization(
        UUID id,
        RingSelections selections,
        long totalPrice,
        String currency,
        Instant createdAt
) {}