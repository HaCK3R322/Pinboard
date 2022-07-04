package com.androsov.pinboard.controllers;

import com.androsov.pinboard.entities.Pin;
import com.androsov.pinboard.entities.Tag;
import com.androsov.pinboard.exceptions.NotFoundException;
import com.androsov.pinboard.exceptions.NoAccessException;
import com.androsov.pinboard.repository.PinRepository;
import com.androsov.pinboard.repository.TagRepository;
import com.androsov.pinboard.repository.UserRepository;
import com.androsov.pinboard.servicies.PinService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import javax.validation.UnexpectedTypeException;
import javax.validation.Valid;
import java.security.Principal;
import java.util.*;

@RestController
@CrossOrigin //TODO: set needed origin
@Validated
public class PinController {
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    // UnexpectedTypeException exception handler
    @ExceptionHandler(UnexpectedTypeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleUnexpectedTypeException(UnexpectedTypeException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    // NotFoundException exception handler
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleNotFoundException(NotFoundException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    // Services exceptions
    @ExceptionHandler(NoAccessException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ResponseEntity<String> handleNoAccessException(NoAccessException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
    }

    final PinRepository repository;
    final TagRepository tagRepository;
    final UserRepository userRepository;
    final PinService pinService;

    public PinController(PinRepository repository, TagRepository tagRepository, UserRepository userRepository,PinService pinService) {
        this.repository = repository;
        this.tagRepository = tagRepository;
        this.userRepository = userRepository;
        this.pinService = pinService;
    }

    @PostMapping("/api/pins/test")
    @ResponseBody
    public ResponseEntity<Iterable<Pin>> testPin(@Valid @RequestBody Iterable<Pin> pins) {
        return new ResponseEntity<>(pins, HttpStatus.OK);
    }

    /**
     * Takes author name from principal and creates pins and access to them.
     * @param pinsToCreate list of pins to create
     * @param principal injected automatically by Spring Security, needs to get authors id by name.
     * @return list of ids of created pins
     */
    @PostMapping("/api/pins/create")
    @ResponseBody
    public ResponseEntity<Iterable<Integer>> create(@Valid @RequestBody Iterable<Pin> pinsToCreate, Principal principal) {
        // get author id by name from principal and set it to pins
        String username = principal.getName();
        Integer userId = userRepository.findByUsername(username).getId();
        for (Pin pin:
                pinsToCreate) {
            pin.setAuthorId(userId);
        }

        // create pins and return their ids
        Iterable<Integer> createdPinsIds = pinService.create(pinsToCreate);
        return new ResponseEntity<>(createdPinsIds, HttpStatus.CREATED);
    }

    @PutMapping("api/pins/update")
    @ResponseBody
    public ResponseEntity<Pin> update(@Valid @RequestBody Pin pinToUpdate, Principal principal) {
        String username = principal.getName();
        Integer currentUserId = userRepository.findByUsername(username).getId();
        if(!Objects.equals(pinToUpdate.getId(), currentUserId))
            throw new NoAccessException("You dont have access to this pin");

        Pin pin = pinService.update(pinToUpdate);

        return new ResponseEntity<>(pin, HttpStatus.OK);
    }

    /**
     * Takes author name from principal and creates pins and access to them.
     * @param principal injected automatically by Spring Security, needs to get authors id by name.
     * @return all accessible pins for author
     */
    @GetMapping("/api/pins/get/all")
    @ResponseBody
    public ResponseEntity<Iterable<Pin>> getAll(Principal principal) {
        // get author id by name from principal
        Integer userId = userRepository.findByUsername(principal.getName()).getId();

        Iterable<Pin> pins = pinService.getAllAccessiblePins(userId);
        return new ResponseEntity<>(pins, HttpStatus.OK);
    }
}
