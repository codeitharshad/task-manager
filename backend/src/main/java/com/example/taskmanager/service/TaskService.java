package com.example.taskmanager.service;

import com.example.taskmanager.dto.CreateTaskRequest;
import com.example.taskmanager.dto.TaskResponse;
import com.example.taskmanager.dto.UpdateStatusRequest;
import com.example.taskmanager.entity.Status;
import com.example.taskmanager.entity.Task;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.ProjectRepository;
import com.example.taskmanager.repository.ProjectMemberRepository;
import com.example.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final UserRepository userRepository;

    public String createTask(CreateTaskRequest request) {

        Long adminId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        userRepository.findById(request.getAssignedTo())
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean isMember = projectMemberRepository
                .findByProjectId(request.getProjectId())
                .stream()
                .anyMatch(m -> m.getUserId().equals(request.getAssignedTo()));

        if (!isMember) {
            throw new RuntimeException("User is not part of this project");
        }

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setProjectId(request.getProjectId());
        task.setAssignedTo(request.getAssignedTo());
        task.setStatus(Status.TODO);
        task.setCreatedBy(adminId);

        taskRepository.save(task);

        return "Task created successfully";
    }

    public List<TaskResponse> getMyTasks() {

        Long userId = (Long) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return taskRepository.findByAssignedTo(userId)
                .stream()
                .map(task -> {

                    String userName = userRepository
                            .findById(task.getAssignedTo())
                            .map(user -> user.getName())
                            .orElse("Unknown");

                    return new TaskResponse(
                            task.getId(),
                            task.getTitle(),
                            task.getStatus().name(),
                            task.getAssignedTo(),
                            userName
                    );
                })
                .toList();
    }

    public String updateTaskStatus(Long taskId, UpdateStatusRequest request) {

        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getAssignedTo().equals(userId)) {
            throw new RuntimeException("You are not allowed to update this task");
        }

        try {
            task.setStatus(Status.valueOf(request.getStatus()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status value");
        }

        taskRepository.save(task);

        return "Task status updated";
    }

    public String deleteTask(Long taskId) {

        taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        taskRepository.deleteById(taskId);

        return "Task deleted";
    }

    public List<TaskResponse> getTasksByProject(Long projectId) {

        projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        return taskRepository.findByProjectId(projectId)
                .stream()
                .map(task -> {

                    String userName = userRepository
                            .findById(task.getAssignedTo())
                            .map(user -> user.getName())
                            .orElse("Unknown");

                    return new TaskResponse(
                            task.getId(),
                            task.getTitle(),
                            task.getStatus().name(),
                            task.getAssignedTo(),
                            userName
                    );
                })
                .toList();
    }
}