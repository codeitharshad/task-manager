package com.example.taskmanager.controller;

import com.example.taskmanager.dto.ApiResponse;
import com.example.taskmanager.dto.CreateTaskRequest;
import com.example.taskmanager.dto.UpdateStatusRequest;
import com.example.taskmanager.service.TaskService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ApiResponse createTask(
            @Valid @RequestBody CreateTaskRequest request
    ) {

        return new ApiResponse(
                taskService.createTask(request)
        );
    }

    @GetMapping("/my")
    public Object getMyTasks() {
        return taskService.getMyTasks();
    }

    @PatchMapping("/{taskId}/status")
    public ApiResponse updateTaskStatus(
            @PathVariable Long taskId,
            @RequestBody UpdateStatusRequest request
    ) {

        return new ApiResponse(
                taskService.updateTaskStatus(taskId, request)
        );
    }

    @DeleteMapping("/{taskId}")
    public ApiResponse deleteTask(@PathVariable Long taskId) {

        return new ApiResponse(
                taskService.deleteTask(taskId)
        );
    }

    @GetMapping("/project/{projectId}")
    public Object getTasksByProject(@PathVariable Long projectId) {
        return taskService.getTasksByProject(projectId);
    }
}