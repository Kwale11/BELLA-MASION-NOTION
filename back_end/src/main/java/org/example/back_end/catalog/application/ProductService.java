package org.example.back_end.catalog.application;

import org.example.back_end.catalog.domain.Product;
import org.example.back_end.catalog.domain.ProductRepository;
import org.example.back_end.shared.error.BusinessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@Transactional(readOnly = true)
public class ProductService {

    private static final Set<String> CATEGORIES = Set.of(
            "all", "wedding-band", "engagement-ring", "couple-ring"
    );

    private static final Set<String> MATERIALS = Set.of(
            "all", "14k", "18k", "platinum"
    );

    private static final Set<String> SORTS = Set.of(
            "recommended", "newest", "price-low", "price-high"
    );

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> search(
            String category,
            String material,
            String sort
    ) {
        if (category == null || !CATEGORIES.contains(category)) {
            throw BusinessException.invalid("지원하지 않는 카테고리입니다.");
        }

        if (material == null || !MATERIALS.contains(material)) {
            throw BusinessException.invalid("지원하지 않는 소재입니다.");
        }

        if (sort == null || !SORTS.contains(sort)) {
            throw BusinessException.invalid("지원하지 않는 정렬 기준입니다.");
        }

        return repository.search(category, material, sort);
    }

    public Product get(String slug) {
        return repository.findBySlug(slug)
                .orElseThrow(() ->
                        BusinessException.notFound("상품을 찾을 수 없습니다.")
                );
    }
}