package com.androsov.pinboard.controllers;

import com.androsov.pinboard.entities.User;
import com.androsov.pinboard.servicies.UserService;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class AuthenticationController {
    private final UserService userService;

    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }

    // POST mapping method for user registration, that creates user
    @PostMapping("/register")
    public User register(@Valid @RequestBody User user) {
        return userService.save(user);
    }

}
