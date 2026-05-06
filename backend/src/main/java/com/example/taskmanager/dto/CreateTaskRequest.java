package com.example.taskmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateTaskRequest {

    @NotBlank(message = "Task title is required")
    private String title;

    @NotBlank(message = "Task description is required")
    private String description;

    @NotNull(message = "Project ID is required")
    private Long projectId;

    @NotNull(message = "Assigned user is required")
    private Long assignedTo;
}