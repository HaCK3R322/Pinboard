package com.androsov.pinboard.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.endpoint.SecurityContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class MainController {
    @GetMapping("/home")
    public String index() {
        return "Index page for all users.";
    }

    // mapping page for only authenticated users
    @GetMapping("/authenticated")
    public String authenticated(Principal principal) {
        Authentication a = SecurityContextHolder.getContext().getAuthentication();
        return "Auth success! Your name: " + principal.getName();
    }
}
