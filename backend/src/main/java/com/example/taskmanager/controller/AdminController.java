package com.example.taskmanager.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @GetMapping
    public String adminAccess() {
        return "Admin access granted";
    }
}