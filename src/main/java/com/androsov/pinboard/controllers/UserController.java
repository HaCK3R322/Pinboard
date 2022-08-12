package com.androsov.pinboard.controllers;

import com.androsov.pinboard.configs.security.SecurityConfiguration;
import com.androsov.pinboard.entities.User;
import com.androsov.pinboard.exceptions.NoAccessException;
import com.androsov.pinboard.exceptions.NotFoundException;
import com.androsov.pinboard.servicies.UserService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.security.Principal;
import java.sql.SQLException;
import java.util.Collection;

@RestController
@CrossOrigin
@Validated
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleNotFoundException(NotFoundException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NoAccessException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ResponseEntity<String> handleNoAccessException(NoAccessException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<String> SQLException(DataIntegrityViolationException e) {
        return new ResponseEntity<>("Username already in use", HttpStatus.CONFLICT);
    }

    // POST mapping to change username of user (only for authenticated user)
    @PostMapping("/user/change/username")
    public User changeUsername(@RequestBody String newUsername, Principal principal) {
        User newUser = userService.changeUsername(principal.getName(), newUsername);

        SecurityContextHolder.getContext().getAuthentication().setAuthenticated(false);
        return newUser;
    }

    // POST mapping to change password
    @PostMapping("/user/change/password")
    public User changePassword(@Valid @RequestBody PasswordChangePostBodyJsonMappingClass passwords) {
        SecurityContextHolder.getContext().getAuthentication().setAuthenticated(false);
        return userService.changePassword(passwords.user, passwords.newPassword);
    }
    @AllArgsConstructor
    private static class PasswordChangePostBodyJsonMappingClass { // https://www.youtube.com/watch?v=04xRauelHnw&ab_channel=INSTASAMKA
        @Getter @Setter public User user;
        @Getter @Setter public String oldPassword;
        @Getter @Setter public String newPassword;
    }

}
