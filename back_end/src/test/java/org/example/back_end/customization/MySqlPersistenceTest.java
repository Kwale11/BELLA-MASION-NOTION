package org.example.back_end.customization;

import org.example.back_end.catalog.application.ProductService;
import org.example.back_end.customization.application.CustomizationService;
import org.example.back_end.customization.domain.RingSelections;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@Tag("mysql")
@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:mysql://localhost:3306/bella_maison_test"
                + "?sslMode=DISABLED"
                + "&allowPublicKeyRetrieval=true"
                + "&connectionTimeZone=UTC"
                + "&forceConnectionTimeZoneToSession=true"
                + "&characterEncoding=UTF-8",
        "spring.datasource.username=bella_app"
})
@Transactional
class MySqlPersistenceTest {

    @Autowired
    private CustomizationService customizations;

    @Autowired
    private ProductService products;

    @Test
    void savesAndLoadsDesign() {
        var selections = new RingSelections(
                "wave", "platinum", "platinum-white",
                "5mm", "hammered", "15", "벨라메종"
        );

        var saved = customizations.create(selections);
        var loaded = customizations.get(saved.id());

        assertEquals(saved, loaded);
        assertEquals(2_050_000L, loaded.totalPrice());
    }

    @Test
    void filtersAndSortsProductsFromMysql() {
        var result = products.search(
                "wedding-band", "18k", "price-low"
        );

        assertEquals(2, result.size());
        assertEquals("eternal-classic-band", result.get(0).slug());
        assertEquals("maison-diamond-band", result.get(1).slug());
    }

    @Test
    void loadsProductDescription() {
        var product = products.get("eternal-classic-band");

        assertEquals(1_280_000L, product.price());
        assertFalse(product.description().isBlank());
    }
}