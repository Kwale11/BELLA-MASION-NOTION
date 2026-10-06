package org.example.back_end.customization.domain;

import java.util.List;
import java.util.stream.IntStream;

public record RingOptions(
        long basePrice,
        List<Option> shapeOptions,
        List<Option> materialOptions,
        List<Option> colorOptions,
        List<Option> widthOptions,
        List<Option> finishOptions,
        List<SizeOption> sizeOptions
) {

    public record Option(
            String id,
            String label,
            long priceDelta,
            List<String> availableFor
    ) {}

    public record SizeOption(String value, String label) {}

    public static RingOptions standard() {
        return new RingOptions(
                980_000,
                List.of(
                        option("classic-round", "클래식 라운드", 0),
                        option("flat", "플랫", 50_000),
                        option("dome", "돔", 80_000),
                        option("wave", "웨이브", 150_000)
                ),
                List.of(
                        option("14k", "14K Gold", 0),
                        option("18k", "18K Gold", 280_000),
                        option("platinum", "Platinum", 520_000)
                ),
                List.of(
                        option("yellow-gold", "옐로 골드", 0, "14k", "18k"),
                        option("rose-gold", "로즈 골드", 0, "14k", "18k"),
                        option("white-gold", "화이트 골드", 70_000, "14k", "18k"),
                        option("platinum-white", "플래티넘 화이트", 0, "platinum")
                ),
                List.of(
                        option("2mm", "2.0mm", 0),
                        option("3mm", "3.0mm", 80_000),
                        option("4mm", "4.0mm", 160_000),
                        option("5mm", "5.0mm", 260_000)
                ),
                List.of(
                        option("polished", "유광", 0),
                        option("matte", "무광", 40_000),
                        option("hairline", "헤어라인", 70_000),
                        option("sandblast", "샌드블라스트", 90_000),
                        option("hammered", "해머드", 140_000)
                ),
                IntStream.rangeClosed(1, 31)
                        .mapToObj(size -> new SizeOption(
                                String.valueOf(size), size + "호"
                        ))
                        .toList()
        );
    }

    private static Option option(
            String id,
            String label,
            long price,
            String... materials
    ) {
        return new Option(id, label, price, List.of(materials));
    }
}