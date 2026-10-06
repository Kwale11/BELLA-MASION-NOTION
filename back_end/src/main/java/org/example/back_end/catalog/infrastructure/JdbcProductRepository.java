package org.example.back_end.catalog.infrastructure;

import org.example.back_end.catalog.domain.Product;
import org.example.back_end.catalog.domain.ProductRepository;
import org.example.back_end.shared.error.BusinessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
class JdbcProductRepository implements ProductRepository {

    private static final String SELECT = """
            SELECT id, slug, name, english_name, category, material,
                   price, image_key, image_alt, badge, customizable,
                   released_at, recommended_order, description
            FROM catalog_products
            """;

    private static final RowMapper<Product> MAPPER = (rs, rowNum) ->
            new Product(
                    rs.getLong("id"),
                    rs.getString("slug"),
                    rs.getString("name"),
                    rs.getString("english_name"),
                    rs.getString("category"),
                    rs.getString("material"),
                    rs.getLong("price"),
                    rs.getString("image_key"),
                    rs.getString("image_alt"),
                    rs.getString("badge"),
                    rs.getBoolean("customizable"),
                    rs.getObject("released_at", LocalDate.class),
                    rs.getInt("recommended_order"),
                    rs.getString("description")
            );

    private final JdbcTemplate jdbc;

    JdbcProductRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public List<Product> search(
            String category,
            String material,
            String sort
    ) {
        String order = switch (sort) {
            case "recommended" -> "recommended_order ASC";
            case "newest" -> "released_at DESC";
            case "price-low" -> "price ASC";
            case "price-high" -> "price DESC";
            default -> throw BusinessException.invalid(
                    "지원하지 않는 정렬 기준입니다."
            );
        };

        StringBuilder sql = new StringBuilder(SELECT)
                .append(" WHERE 1 = 1");

        List<Object> parameters = new ArrayList<>();

        if (!"all".equals(category)) {
            sql.append(" AND category = ?");
            parameters.add(category);
        }

        if (!"all".equals(material)) {
            sql.append(" AND material = ?");
            parameters.add(material);
        }

        sql.append(" ORDER BY ").append(order).append(", id ASC");

        return jdbc.query(sql.toString(), MAPPER, parameters.toArray());
    }

    @Override
    public Optional<Product> findBySlug(String slug) {
        return jdbc.query(
                SELECT + " WHERE slug = ?",
                MAPPER,
                slug
        ).stream().findFirst();
    }
}