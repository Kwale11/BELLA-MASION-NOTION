package org.example.back_end.customization.domain;

public record RingSelections(
        String shape,
        String material,
        String color,
        String width,
        String finish,
        String size,
        String engraving
) {
    public RingSelections {
        engraving = engraving == null ? "" : engraving.strip();
    }
}