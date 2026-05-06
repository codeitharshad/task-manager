package com.example.taskmanager.service;

import com.example.taskmanager.dto.AddMemberRequest;
import com.example.taskmanager.dto.CreateProjectRequest;
import com.example.taskmanager.dto.ProjectMemberResponse;
import com.example.taskmanager.entity.Project;
import com.example.taskmanager.entity.ProjectMember;
import com.example.taskmanager.entity.User;
import com.example.taskmanager.repository.ProjectMemberRepository;
import com.example.taskmanager.repository.ProjectRepository;
import com.example.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    private final ProjectMemberRepository projectMemberRepository;

    private final UserRepository userRepository;

    public String createProject(
            CreateProjectRequest request
    ) {

        Long userId = (Long)
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();

        Project project = new Project();

        project.setName(request.getName());

        project.setCreatedBy(userId);

        projectRepository.save(project);

        return "Project created successfully";
    }

    public String addMember(
            Long projectId,
            AddMemberRequest request
    ) {

        projectRepository.findById(projectId)
                .orElseThrow(() ->
                        new RuntimeException("Project not found")
                );

        userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        if (
                projectMemberRepository
                        .existsByProjectIdAndUserId(
                                projectId,
                                request.getUserId()
                        )
        ) {

            throw new RuntimeException(
                    "User already added to project"
            );
        }

        ProjectMember member = new ProjectMember();

        member.setProjectId(projectId);

        member.setUserId(request.getUserId());

        projectMemberRepository.save(member);

        return "Member added to project";
    }

    public List<Project> getAllProjects() {

        return projectRepository.findAll();
    }

    public List<ProjectMember> getUserProjects() {

        Long userId = (Long)
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();

        return projectMemberRepository.findByUserId(userId);
    }

    public List<ProjectMemberResponse> getProjectMembers(
            Long projectId
    ) {

        projectRepository.findById(projectId)
                .orElseThrow(() ->
                        new RuntimeException("Project not found")
                );

        return projectMemberRepository
                .findByProjectId(projectId)
                .stream()
                .map(member -> {

                    User user = userRepository
                            .findById(member.getUserId())
                            .orElseThrow(() ->
                                    new RuntimeException("User not found")
                            );

                    return new ProjectMemberResponse(
                            user.getId(),
                            user.getName(),
                            user.getEmail()
                    );
                })
                .toList();
    }
}