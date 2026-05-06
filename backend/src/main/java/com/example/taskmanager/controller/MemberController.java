package com.example.taskmanager.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
public class MemberController {

    @GetMapping
    public String memberAccess() {
        return "Member access granted";
    }
}