package com.androsov.pinboard.controllers;

import com.androsov.pinboard.entities.Pin;
import com.androsov.pinboard.repository.PinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class PinController {

    final PinRepository repository;

    public PinController(PinRepository repository) {
        this.repository = repository;
    }

    /**
     * Mapping method for creation number of pins.
     * @param pinsToCreate - array of pins in JSON style. (id will be generated automatically)
     * @return Response body contains array of id for each of pins in given order (also in JSON).
     */
    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity<List<Integer>> create(@RequestBody Iterable<Pin> pinsToCreate) {
        Iterable<Pin> createdPins = repository.saveAll(pinsToCreate);

        List<Integer> ids = new ArrayList<>();
        for (Pin pin:
             createdPins) {
            ids.add(pin.getId());
        }

        return new ResponseEntity<>(ids, HttpStatus.OK);
    }
}
