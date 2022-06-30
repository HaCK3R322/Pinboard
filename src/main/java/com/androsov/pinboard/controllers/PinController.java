package com.androsov.pinboard.controllers;

import com.androsov.pinboard.entities.Pin;
import com.androsov.pinboard.entities.Tag;
import com.androsov.pinboard.repository.PinRepository;
import com.androsov.pinboard.repository.TagRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.sql.Date;
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

    final PinRepository repository;
    final TagRepository tagRepository;

    public PinController(PinRepository repository, TagRepository tagRepository) {
        this.repository = repository;
        this.tagRepository = tagRepository;
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

    @GetMapping("/api/pins/get/byTags")
    @ResponseBody
    public ResponseEntity<Iterable<Pin>> getAllByTags(@Valid @RequestBody List<String> tagsDescriptions) { // TODO: подумать как можно это упростить
        // Create Integer that represents required number of matches of tags for pins and set it to list size of tags
        Integer requiredNumberOfMatches = tagsDescriptions.size();

        // Create list of tags by descriptions from request
        List<Tag> tags = new ArrayList<>();
        for (String tagDescription:
             tagsDescriptions) {
            tags.addAll(tagRepository.getAllByDescription(tagDescription));
        }

        Set<Integer> suitablePinsIds = new HashSet<>();
        for (Tag tag:
             tags) {
            suitablePinsIds.add(tag.getPinId());
        }

        // Count all tags matches for each pin.
        Map<Integer, Integer> pinIdToMatchesCount = new HashMap<>();
        for (Integer pinId:
             suitablePinsIds) {
            pinIdToMatchesCount.put(pinId, 0);
        }
        for (Tag tag:
             tags) {
            pinIdToMatchesCount.put(tag.getPinId(), pinIdToMatchesCount.get(tag.getPinId()) + 1);
        }

        // Filter pins by required number of matches.
        List<Pin> suitablePins = new ArrayList<>();
        for (Integer pinId:
             pinIdToMatchesCount.keySet()) {
            if (pinIdToMatchesCount.get(pinId).equals(requiredNumberOfMatches)) {
                suitablePins.add(repository.getPinById(pinId));
            }
        }

        return new ResponseEntity<>(suitablePins, HttpStatus.OK);
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

    // POST mapping method for deleting number of pins by id, that runs through list of ids and deletes them one by one.
    // Also deletes all related tags from tagRepository that PinId field contains deleted pins ids.
    // Returns list of deleted pins.
    @PostMapping("/api/pins/delete/byId")
    @ResponseBody
    public ResponseEntity<List<Pin>> deleteById(@Valid @RequestBody List<Integer> ids) {
        List<Pin> deletedPins = new ArrayList<>();
        List<Tag> deletedTags = new ArrayList<>();
        for (Integer id:
                ids) {
            Pin pin = repository.getPinById(id);
            deletedPins.add(pin);
            deletedTags.addAll(tagRepository.getAllByPinId(id));
            repository.deleteById(id);
        }
        tagRepository.deleteAll(deletedTags);

        return new ResponseEntity<>(deletedPins, HttpStatus.OK);
    }
}
