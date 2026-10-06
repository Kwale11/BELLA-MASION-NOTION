package org.example.back_end.customization.application;

import org.example.back_end.customization.domain.*;
import org.example.back_end.shared.error.BusinessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
public class CustomizationService {

    private final CustomizationRepository repository;

    private final RingOptions options = RingOptions.standard();
    private final RingPricingPolicy pricing = new RingPricingPolicy(options);

    public CustomizationService(CustomizationRepository repository) {
        this.repository = repository;
    }

    public RingOptions options() {
        return options;
    }

    public Quote quote(RingSelections selections) {
        return pricing.calculate(selections);
    }

    @Transactional
    public Customization create(RingSelections selections) {
        Quote quote = pricing.calculate(selections);

        Customization customization = new Customization(
                UUID.randomUUID(),
                selections,
                quote.totalPrice(),
                quote.currency(),
                Instant.now().truncatedTo(ChronoUnit.MICROS)
        );

        repository.save(customization);
        return customization;
    }

    @Transactional(readOnly = true)
    public Customization get(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> BusinessException.notFound(
                        "저장된 커스터마이징을 찾을 수 없습니다."
                ));
    }
}