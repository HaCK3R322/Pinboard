package com.androsov.pinboard.controllers;

import com.androsov.pinboard.entities.Pin;
import com.androsov.pinboard.repository.PinRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin //TODO: set needed origin
@Validated
public class PinController {
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    final PinRepository repository;

    public PinController(PinRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/api/pins/create")
    @ResponseBody
    public ResponseEntity<List<Integer>> create(@Valid @RequestBody Iterable<Pin> pinsToCreate) {
        Iterable<Pin> createdPins = repository.saveAll(pinsToCreate);

        List<Integer> ids = new ArrayList<>();
        for (Pin pin:
                createdPins) {
            ids.add(pin.getId());
        }

        return new ResponseEntity<>(ids, HttpStatus.CREATED);
    }

    @PutMapping("api/pins/update")
    @ResponseBody
    public ResponseEntity<String> update(@Valid @RequestBody Pin pinToUpdate) {
        repository.save(pinToUpdate);

        return new ResponseEntity<>("Pin updated. New pin: " + pinToUpdate.toString(), HttpStatus.OK);
    }

    @GetMapping("/api/pins/get/byAuthor")
    @ResponseBody
    public ResponseEntity<Iterable<Pin>> getAllByAuthor(@RequestParam String author) {
        Iterable<Pin> pins = repository.getAllByAuthor(author);

        return new ResponseEntity<>(pins, HttpStatus.OK);
    }

    @GetMapping("/api/pins/get/byColor")
    @ResponseBody
    public ResponseEntity<Iterable<Pin>> getAllByColor(@RequestParam String color) {
        Iterable<Pin> pins = repository.getAllByColor(color);

        return new ResponseEntity<>(pins, HttpStatus.OK);
    }

    @GetMapping("/api/pins/get/byDateCompletion")
    @ResponseBody
    public ResponseEntity<Iterable<Pin>> getAllByDateCompletion(@RequestParam Date date) {
        Iterable<Pin> pins = repository.getAllByDateCompletion(date);

        return new ResponseEntity<>(pins, HttpStatus.OK);
    }

    @GetMapping("/api/pins/get/byDateCreation")
    @ResponseBody
    public ResponseEntity<Iterable<Pin>> getAllByDateCreation(@RequestParam Date date) {
        Iterable<Pin> pins = repository.getAllByDateCreation(date);

        return new ResponseEntity<>(pins, HttpStatus.OK);
    }

    @GetMapping("/api/pins/get/byDateDeadline")
    @ResponseBody
    public ResponseEntity<Iterable<Pin>> getAllByDateDeadline(@RequestParam Date date) {
        Iterable<Pin> pins = repository.getAllByDateDeadline(date);

        return new ResponseEntity<>(pins, HttpStatus.OK);
    }

    @GetMapping("/api/pins/get/byDescription")
    @ResponseBody
    public ResponseEntity<Iterable<Pin>> getAllByDescription(@RequestParam String description) {
        Iterable<Pin> pins = repository.getAllByDescription(description);

        return new ResponseEntity<>(pins, HttpStatus.OK);
    }

    @GetMapping("/api/pins/get/byGroupName")
    @ResponseBody
    public ResponseEntity<Iterable<Pin>> getAllByGroupName(@RequestParam String groupName) {
        Iterable<Pin> pins = repository.getAllByGroupName(groupName);

        return new ResponseEntity<>(pins, HttpStatus.OK);
    }

    @GetMapping("/api/pins/get/byPriority")
    @ResponseBody
    public ResponseEntity<Iterable<Pin>> getAllByPriority(@RequestParam Integer priority) {
        Iterable<Pin> pins = repository.getAllByPriority(priority);

        return new ResponseEntity<>(pins, HttpStatus.OK);
    }

    @GetMapping("/api/pins/get/byStatus")
    @ResponseBody
    public ResponseEntity<Iterable<Pin>> getAllByStatus(@RequestParam String status) {
        Iterable<Pin> pins = repository.getAllByStatus(status);

        return new ResponseEntity<>(pins, HttpStatus.OK);
    }
}
