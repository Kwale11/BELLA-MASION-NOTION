package org.example.back_end.catalog.api;

import org.example.back_end.catalog.application.ProductService;
import org.example.back_end.catalog.domain.Product;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
class ProductController {

    private final ProductService service;

    ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    List<Product> products(
            @RequestParam(defaultValue = "all") String category,
            @RequestParam(defaultValue = "all") String material,
            @RequestParam(defaultValue = "recommended") String sort
    ) {
        return service.search(category, material, sort);
    }

    @GetMapping("/{slug}")
    ProductDetail detail(@PathVariable String slug) {
        Product product = service.get(slug);

        return new ProductDetail(
                product,
                List.of(
                        new Specification("Material", product.material()),
                        new Specification("Color", "주문 시 선택"),
                        new Specification(
                                "Customization",
                                product.customizable() ? "가능" : "상담 필요"
                        )
                )
        );
    }

    public record ProductDetail(
            Product product,
            List<Specification> specifications
    ) {}

    public record Specification(String label, String value) {}
}