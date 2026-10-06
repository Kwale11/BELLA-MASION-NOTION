package org.example.back_end.store.api;

import org.example.back_end.store.application.StoreService;
import org.example.back_end.store.domain.StoreInformation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/store")
class StoreController {

    private final StoreService service;

    StoreController(StoreService service) {
        this.service = service;
    }

    @GetMapping
    StoreInformation get() {
        return service.get();
    }
}