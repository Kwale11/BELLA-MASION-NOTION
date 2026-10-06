package org.example.back_end.customization.api;

import org.example.back_end.customization.application.CustomizationService;
import org.example.back_end.customization.domain.Customization;
import org.example.back_end.customization.domain.Quote;
import org.example.back_end.customization.domain.RingOptions;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/api")
class CustomizationController {

    private final CustomizationService service;

    CustomizationController(CustomizationService service) {
        this.service = service;
    }

    @GetMapping("/customization/options")
    RingOptions options() {
        return service.options();
    }

    @PostMapping("/customization/quote")
    Quote quote(@Valid @RequestBody CustomizationRequest request) {
        return service.quote(request.toSelections());
    }

    @PostMapping("/customizations")
    ResponseEntity<Customization> create(
            @Valid @RequestBody CustomizationRequest request
    ) {
        Customization result = service.create(request.toSelections());

        return ResponseEntity
                .created(URI.create("/api/customizations/" + result.id()))
                .body(result);
    }

    @GetMapping("/customizations/{id}")
    Customization get(@PathVariable UUID id) {
        return service.get(id);
    }
}