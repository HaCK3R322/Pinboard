package com.androsov.pinboard.controllers;

import com.androsov.pinboard.entities.Pin;
import com.androsov.pinboard.repository.PinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PinController {

    final PinRepository repository;

    public PinController(PinRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/pins")
    String getAllPins() {
        StringBuilder allPins = new StringBuilder();

        for (Pin pin : repository.findAll()){
            allPins.append(pin.toString()).append("\n");
        }

        return allPins.toString();
    }
}
