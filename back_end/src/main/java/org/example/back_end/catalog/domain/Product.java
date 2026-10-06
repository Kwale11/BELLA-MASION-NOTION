package org.example.back_end.catalog.domain;

import java.time.LocalDate;

public record Product(
        long id,
        String slug,
        String name,
        String englishName,
        String category,
        String material,
        long price,
        String imageKey,
        String imageAlt,
        String badge,
        boolean customizable,
        LocalDate releasedAt,
        int recommendedOrder,
        String description
) {}