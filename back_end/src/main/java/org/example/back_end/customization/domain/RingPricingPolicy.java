package org.example.back_end.customization.domain;

import org.example.back_end.shared.error.BusinessException;

import java.util.List;

public final class RingPricingPolicy {

    private final RingOptions options;

    public RingPricingPolicy(RingOptions options) {
        this.options = options;
    }

    public Quote calculate(RingSelections selection) {
        if (selection == null) {
            throw BusinessException.invalid("반지 옵션이 필요합니다.");
        }

        var shape = find(options.shapeOptions(), selection.shape(), "모양");
        var material = find(options.materialOptions(), selection.material(), "소재");
        var color = find(options.colorOptions(), selection.color(), "색상");
        var width = find(options.widthOptions(), selection.width(), "폭");
        var finish = find(options.finishOptions(), selection.finish(), "표면");

        if (!color.availableFor().contains(material.id())) {
            throw BusinessException.invalid(
                    "선택한 소재에 사용할 수 없는 색상입니다."
            );
        }

        boolean validSize = options.sizeOptions().stream()
                .anyMatch(size -> size.value().equals(selection.size()));

        if (!validSize) {
            throw BusinessException.invalid("호수는 1~31 사이여야 합니다.");
        }

        if (selection.engraving().length() > 30) {
            throw BusinessException.invalid("각인은 30자 이하여야 합니다.");
        }

        var items = List.of(
                item("shape", shape),
                item("material", material),
                item("color", color),
                item("width", width),
                item("finish", finish)
        );

        long total = options.basePrice()
                + items.stream()
                .mapToLong(Quote.PriceItem::priceDelta)
                .sum();

        return new Quote(
                options.basePrice(),
                items,
                total,
                "KRW",
                "/models/rings/" + shape.id() + "-" + width.id() + ".glb"
        );
    }

    private RingOptions.Option find(
            List<RingOptions.Option> options,
            String id,
            String label
    ) {
        return options.stream()
                .filter(option -> option.id().equals(id))
                .findFirst()
                .orElseThrow(() -> BusinessException.invalid(
                        "유효하지 않은 " + label + " 옵션입니다."
                ));
    }

    private Quote.PriceItem item(
            String category,
            RingOptions.Option option
    ) {
        return new Quote.PriceItem(
                category, option.id(), option.priceDelta()
        );
    }
}