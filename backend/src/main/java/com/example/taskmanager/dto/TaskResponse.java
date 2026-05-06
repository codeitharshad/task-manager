package com.example.taskmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TaskResponse {

    private Long id;

    private String title;

    private String status;

    private Long assignedTo;

    private String assignedUserName;
}