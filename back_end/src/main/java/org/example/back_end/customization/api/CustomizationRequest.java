package org.example.back_end.customization.api;

import org.example.back_end.customization.domain.RingSelections;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CustomizationRequest(
        @NotBlank String shape,
        @NotBlank String material,
        @NotBlank String color,
        @NotBlank String width,
        @NotBlank String finish,

        @NotBlank
        @Pattern(
                regexp = "([1-9]|[12][0-9]|3[01])",
                message = "호수는 1~31 사이여야 합니다."
        )
        String size,

        @Size(max = 30, message = "각인은 30자 이하여야 합니다.")
        String engraving
) {
    public RingSelections toSelections() {
        return new RingSelections(
                shape, material, color, width, finish, size, engraving
        );
    }
}