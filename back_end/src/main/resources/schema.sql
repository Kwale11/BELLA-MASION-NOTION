CREATE TABLE IF NOT EXISTS customization_designs (
                                                     id UUID PRIMARY KEY,
                                                     shape VARCHAR(40) NOT NULL,
    material VARCHAR(20) NOT NULL,
    color VARCHAR(40) NOT NULL,
    ring_width VARCHAR(10) NOT NULL,
    finish VARCHAR(30) NOT NULL,
    ring_size VARCHAR(2) NOT NULL,
    engraving VARCHAR(30) NOT NULL,
    total_price BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL
                             );