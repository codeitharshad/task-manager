package com.example.taskmanager.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    private Long projectId;

    private Long assignedTo;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Long createdBy;
}