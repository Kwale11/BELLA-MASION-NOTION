package org.example.back_end.customization.domain;

import java.util.Optional;
import java.util.UUID;

public interface CustomizationRepository {

    void save(Customization customization);

    Optional<Customization> findById(UUID id);
}