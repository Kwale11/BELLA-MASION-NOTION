package org.example.back_end.customization;

import org.example.back_end.customization.domain.*;
import org.example.back_end.shared.error.BusinessException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RingPricingPolicyTest {

    private final RingPricingPolicy pricing =
            new RingPricingPolicy(RingOptions.standard());

    @Test
    void calculatesExpectedPrice() {
        var selections = new RingSelections(
                "classic-round", "18k", "yellow-gold",
                "3mm", "polished", "12", ""
        );

        Quote quote = pricing.calculate(selections);

        assertEquals(1_340_000L, quote.totalPrice());
        assertEquals(
                "/models/rings/classic-round-3mm.glb",
                quote.modelUrl()
        );
    }

    @Test
    void rejectsIncompatibleMaterialAndColor() {
        var selections = new RingSelections(
                "classic-round", "platinum", "yellow-gold",
                "3mm", "polished", "12", ""
        );

        assertThrows(
                BusinessException.class,
                () -> pricing.calculate(selections)
        );
    }

    @Test
    void rejectsUnknownShape() {
        var selections = new RingSelections(
                "unknown", "18k", "yellow-gold",
                "3mm", "polished", "12", ""
        );

        assertThrows(
                BusinessException.class,
                () -> pricing.calculate(selections)
        );
    }

    @Test
    void rejectsInvalidSize() {
        var selections = new RingSelections(
                "classic-round", "18k", "yellow-gold",
                "3mm", "polished", "32", ""
        );

        assertThrows(
                BusinessException.class,
                () -> pricing.calculate(selections)
        );
    }

    @Test
    void rejectsLongEngraving() {
        var selections = new RingSelections(
                "classic-round", "18k", "yellow-gold",
                "3mm", "polished", "12", "A".repeat(31)
        );

        assertThrows(
                BusinessException.class,
                () -> pricing.calculate(selections)
        );
    }
}