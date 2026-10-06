package org.example.back_end.catalog.domain;

import java.util.List;
import java.util.Optional;

public interface ProductRepository {

    List<Product> search(String category, String material, String sort);

    Optional<Product> findBySlug(String slug);
}