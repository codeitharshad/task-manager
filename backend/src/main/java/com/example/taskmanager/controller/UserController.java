package com.example.taskmanager.controller;

import com.example.taskmanager.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public Object getAllUsers() {

        return userService.getAllUsers();
    }
}