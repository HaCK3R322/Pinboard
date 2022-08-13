package com.androsov.pinboard.controllers;

import com.androsov.pinboard.entities.Pin;
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
@CrossOrigin
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

    @ExceptionHandler(NullPointerException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleNullPointerException(NullPointerException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
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

    @GetMapping("/api/pins/create")
    @ResponseBody
    public ResponseEntity<String> createDescription() {
        return new ResponseEntity<>("""
               This is a page to create pins.
               After you authorized, you can send here POST requests with JSON body, that contains JSON array of pins.
               Example of JSON body:
               [
                   {
                       "groupName": "groupName",
                       "description": "description",
                       "color": "color",
                       "dateCreation": "2020-01-01",
                       "dateCompletion": "2020-01-01",
                       "dateDeadline": "2020-01-01",
                       "priority": 1,
                       "status": "status"
                   }
               ]
               """,
                HttpStatus.OK);
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

    @GetMapping("/api/pins/update")
    @ResponseBody
    public ResponseEntity<String> updateDescription() {
        return new ResponseEntity<>("""
               This is a page to update pins.
               After you authorized, you can send here POST requests with JSON body, that contains JSON of ONE pin.
               Be carefully, all fields that not specified will set to null.
               Example of JSON body:
               {
                       "id": 1,
                       "groupName": "groupName",
                       "description": "description",
                       "color": "color"
               }
               """,
                HttpStatus.OK);
    }

    @PutMapping("/api/pins/update")
    @ResponseBody
    public ResponseEntity<Pin> update(@Valid @RequestBody Pin pinToUpdate, Principal principal) {
        // get current user id by name from principal
        Integer currentUserId = userRepository.findByUsername(principal.getName()).getId();

        // get all accesses for this pin and check if user has access to it
        List<Integer> pinUserAccessors = pinService.getAllAccessorsIds(pinToUpdate.getId());
        if (!pinUserAccessors.contains(currentUserId)) {
            throw new NoAccessException("You don't have access to this pin");
        }

        pinToUpdate.setAuthorId(currentUserId); // maybe I can make it easier?
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

    @GetMapping
    @ResponseBody
    public ResponseEntity<String> deleteAllDescription() {
        return new ResponseEntity<>("""
               This is a page to delete pins.
               After you authorized, you can send here POST requests with JSON body,
               that contains JSON array of pins. The only really important field is id.
               
               Example of JSON body:
               [
                   {
                    "id": 1
                   },
                   {
                    "id": 2
                    "color": "red"
                   }
               ]
               
               You can delete only pins that you've created.
               Deleting is full deleting of pin from database.
               If you want to make pin "done" or something, you can send update request.
               """,
                HttpStatus.OK);
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<Iterable<Pin>> deleteAll(@Valid @RequestBody Iterable<Pin> pinsToDelete, Principal principal) {
        // get author id by name from principal
        String username = principal.getName();
        Integer userId = userRepository.findByUsername(username).getId();

        // check if user is author to all pins
        for (Pin pin:
                pinsToDelete) {
            if(!pin.getAuthorId().equals(userId))
                throw new NoAccessException("Delete pin can only author of the pin");
        }

        Iterable<Pin> pins = pinService.deleteAllInList(pinsToDelete);
        return new ResponseEntity<>(pins, HttpStatus.OK);
    }
}
