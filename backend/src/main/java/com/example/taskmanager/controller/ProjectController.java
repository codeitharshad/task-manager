package com.example.taskmanager.controller;

import com.example.taskmanager.dto.ApiResponse;
import com.example.taskmanager.dto.CreateProjectRequest;
import com.example.taskmanager.dto.AddMemberRequest;
import com.example.taskmanager.service.ProjectService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ApiResponse createProject(
            @Valid @RequestBody CreateProjectRequest request
    ) {

        return new ApiResponse(
                projectService.createProject(request)
        );
    }

    @PostMapping("/{projectId}/members")
    public ApiResponse addMember(
            @PathVariable Long projectId,
            @Valid @RequestBody AddMemberRequest request
    ) {

        return new ApiResponse(
                projectService.addMember(projectId, request)
        );
    }

    @GetMapping
    public Object getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/my")
    public Object getMyProjects() {
        return projectService.getUserProjects();
    }

    @GetMapping("/{projectId}/members")
    public Object getProjectMembers(@PathVariable Long projectId) {

        return projectService.getProjectMembers(projectId);
    }
}