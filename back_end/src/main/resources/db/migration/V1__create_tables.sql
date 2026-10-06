CREATE TABLE catalog_products (
                                  id BIGINT NOT NULL AUTO_INCREMENT,
                                  slug VARCHAR(120) NOT NULL,
                                  name VARCHAR(150) NOT NULL,
                                  english_name VARCHAR(150) NOT NULL,
                                  category VARCHAR(40) NOT NULL,
                                  material VARCHAR(20) NOT NULL,
                                  price BIGINT NOT NULL,
                                  image_key VARCHAR(80) NOT NULL,
                                  image_alt VARCHAR(200) NOT NULL,
                                  badge VARCHAR(20) NULL,
                                  customizable BOOLEAN NOT NULL,
                                  released_at DATE NOT NULL,
                                  recommended_order INT NOT NULL,
                                  description TEXT NOT NULL,

                                  PRIMARY KEY (id),
                                  CONSTRAINT uk_catalog_products_slug UNIQUE (slug),
                                  CONSTRAINT ck_catalog_products_price CHECK (price >= 0),

                                  INDEX idx_catalog_products_filter (category, material),
                                  INDEX idx_catalog_products_price (price),
                                  INDEX idx_catalog_products_released (released_at)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;


CREATE TABLE customization_designs (
                                       id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
                                       shape VARCHAR(40) NOT NULL,
                                       material VARCHAR(20) NOT NULL,
                                       color VARCHAR(40) NOT NULL,
                                       ring_width VARCHAR(10) NOT NULL,
                                       finish VARCHAR(30) NOT NULL,
                                       ring_size TINYINT UNSIGNED NOT NULL,
                                       engraving VARCHAR(30) NOT NULL,
                                       total_price BIGINT NOT NULL,
                                       currency CHAR(3) NOT NULL,
                                       created_at DATETIME(6) NOT NULL,

                                       PRIMARY KEY (id),
                                       CONSTRAINT ck_customization_price CHECK (total_price >= 0),
                                       CONSTRAINT ck_customization_size CHECK (ring_size BETWEEN 1 AND 31),

                                       INDEX idx_customization_created (created_at)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;