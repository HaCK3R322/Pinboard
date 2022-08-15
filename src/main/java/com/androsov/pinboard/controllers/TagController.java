package com.androsov.pinboard.controllers;

// Cross origin tag controller that maps all actions for tags
// Language: java
// Path: src\main\java\com\androsov\pinboard\controllers\TagController.java
// Compare this snippet from src\main\java\com\androsov\pinboard\controllers\PinController.java:
// package com.androsov.pinboard.controllers;
//

import com.androsov.pinboard.entities.Pin;
import com.androsov.pinboard.entities.PinUserAccess;
import com.androsov.pinboard.entities.Tag;
import com.androsov.pinboard.exceptions.NoAccessException;
import com.androsov.pinboard.repository.PinUserAccessRepository;
import com.androsov.pinboard.repository.TagRepository;
import com.androsov.pinboard.servicies.PinService;
import com.androsov.pinboard.servicies.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@Validated
public class TagController { //TODO: create TagService, where i can check if that user has access to that tag
    final TagRepository tagRepository;
    final PinUserAccessRepository pinUserAccessRepository;
    final PinService pinService;
    final UserService userService;

    public TagController(TagRepository tagRepository, PinUserAccessRepository pinUserAccessRepository, PinService pinService, UserService userService) {
        this.tagRepository = tagRepository;
        this.pinUserAccessRepository = pinUserAccessRepository;
        this.pinService = pinService;
        this.userService = userService;
    }

    // not valid tag input parameters exception handler
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoAccessException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleNoAccessException(NoAccessException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/api/tags/create")
    @ResponseBody
    public ResponseEntity<List<Integer>> create(@Valid @RequestBody Iterable<Tag> tagsToCreate, Principal principal) {
        List<Integer> pinIds = new ArrayList<>();
        for (Tag tag:
                tagsToCreate) {
            pinIds.add(tag.getPinId());
        }

        for (Integer pinId:
                pinIds) {
            Integer currentUserId = userService.getByName(principal.getName()).getId();

            if (!pinService.hasAccess(pinId, currentUserId)) {
                throw new NoAccessException("You don't have access to pin with id: " + pinId);
            }
        }

        Iterable<Tag> createdTags = tagRepository.saveAll(tagsToCreate);

        List<Integer> ids = new ArrayList<>();
        for (Tag tag:
                createdTags) {
            ids.add(tag.getId());
        }

        return new ResponseEntity<>(ids, HttpStatus.CREATED);
    }

    // PUT request mapping method to update tag by id. Id is a list in request body.
    @PutMapping("api/tags/update")
    @ResponseBody
    public ResponseEntity<String> update(@Valid @RequestBody List<Tag> tagsToUpdate, Principal principal) {
        //TODO: separate logic to TagService
        List<Integer> pinIds = new ArrayList<>();
        for (Tag tag:
                tagsToUpdate) {
            pinIds.add(tag.getPinId());
        }

        for (Integer pinId:
                pinIds) {
            Integer currentUserId = userService.getByName(principal.getName()).getId();

            if (!pinService.hasAccess(pinId, currentUserId)) {
                throw new NoAccessException("You don't have access to pin with id: " + pinId);
            }
        }

        tagRepository.saveAll(tagsToUpdate);

        return new ResponseEntity<>("Tag updated. New tag: " + tagsToUpdate.toString(), HttpStatus.OK);
    }

    // POST request mapping method to get all tags by pin id. Ids is a list in request body.
    @PostMapping("/api/tags/get/byPinId")
    @ResponseBody
    public ResponseEntity<Iterable<Tag>> getAllByPins(@Valid @RequestBody List<Integer> pinIds, Principal principal) {
        for (Integer pinId:
             pinIds) {
            Integer currentUserId = userService.getByName(principal.getName()).getId();

            if (!pinService.hasAccess(pinId, currentUserId)) {
                throw new NoAccessException("You don't have access to pin with id: " + pinId);
            }
        }

        Iterable<Tag> tags = tagRepository.findAllByPinIdIn(pinIds);

        return new ResponseEntity<>(tags, HttpStatus.OK);
    }

    // POST request mapping method to delete tag by ids. Ids is a list in request body.
    @PostMapping("/api/tags/delete")
    @ResponseBody
    public ResponseEntity<List<Tag>> delete(@Valid @RequestBody List<Integer> tagIds, Principal principal) {
        //TODO: separate logic to TagService
        List<Integer> pinIds = new ArrayList<>();
        for (Integer tagId:
             tagIds) {
            Tag tag = tagRepository.findById(tagId).get();
            pinIds.add(tag.getPinId());
        }

        for (Integer pinId:
                pinIds) {
            Integer currentUserId = userService.getByName(principal.getName()).getId();

            if (!pinService.hasAccess(pinId, currentUserId)) {
                throw new NoAccessException("You don't have access to pin with id: " + pinId);
            }
        }

        List<Tag> deletedTags = new ArrayList<>();
        for (Integer tagId:
                tagIds) {
            deletedTags.add(tagRepository.findById(tagId).get());
            tagRepository.deleteById(tagId);
        }

        return new ResponseEntity<>(deletedTags, HttpStatus.OK);
    }
}
