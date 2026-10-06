package org.example.back_end.customization.infrastructure;

import org.example.back_end.customization.domain.Customization;
import org.example.back_end.customization.domain.CustomizationRepository;
import org.example.back_end.customization.domain.RingSelections;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;
import java.util.UUID;

@Repository
class JdbcCustomizationRepository implements CustomizationRepository {

    private final JdbcTemplate jdbc;

    JdbcCustomizationRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public void save(Customization customization) {
        RingSelections selection = customization.selections();

        jdbc.update("""
                INSERT INTO customization_designs (
                    id, shape, material, color, ring_width,
                    finish, ring_size, engraving,
                    total_price, currency, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                customization.id().toString(),
                selection.shape(),
                selection.material(),
                selection.color(),
                selection.width(),
                selection.finish(),
                Integer.parseInt(selection.size()),
                selection.engraving(),
                customization.totalPrice(),
                customization.currency(),
                LocalDateTime.ofInstant(
                        customization.createdAt(), ZoneOffset.UTC
                )
        );
    }

    @Override
    public Optional<Customization> findById(UUID id) {
        return jdbc.query("""
                SELECT id, shape, material, color, ring_width,
                       finish, ring_size, engraving,
                       total_price, currency, created_at
                FROM customization_designs
                WHERE id = ?
                """,
                (rs, rowNum) -> new Customization(
                        UUID.fromString(rs.getString("id")),
                        new RingSelections(
                                rs.getString("shape"),
                                rs.getString("material"),
                                rs.getString("color"),
                                rs.getString("ring_width"),
                                rs.getString("finish"),
                                String.valueOf(rs.getInt("ring_size")),
                                rs.getString("engraving")
                        ),
                        rs.getLong("total_price"),
                        rs.getString("currency"),
                        rs.getObject(
                                "created_at", LocalDateTime.class
                        ).toInstant(ZoneOffset.UTC)
                ),
                id.toString()
        ).stream().findFirst();
    }
}