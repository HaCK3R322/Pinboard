package com.androsov.pinboard.controllers;


import com.androsov.pinboard.entities.User;
import com.androsov.pinboard.servicies.UserService;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@CrossOrigin
public class LoginController {
    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    // get method that mapps custom login page with thymeleaf
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    // POST mapping method for user registration, that creates user
    // consumes application/xxx-www-form-urlencoded
    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public String register(@Valid @ModelAttribute User user) {
        userService.save(user);
        return "login";
    }

    @GetMapping("/")
    public String home() {
        return "index";
    }

}
