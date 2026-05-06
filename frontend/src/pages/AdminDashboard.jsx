import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getProjects,
  createProject,
  getProjectMembers,
  addMemberToProject,
} from "../api/projectApi";

import { getUsers } from "../api/userApi";

import { getTasksByProject, createTask, deleteTask } from "../api/taskApi";

function AdminDashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("success");

  
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });

  //toast
  const showToast = (message, type = "success") => {
    setToast(message);

    setToastType(type);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  //fetch projects
  const fetchProjects = async () => {
    try {
      const data = await getProjects();

      setProjects(data);
    } catch (error) {
      showToast("Failed to load projects", "error");
    }
  };

  // fetch users
  const fetchUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      showToast("Failed to load users", "error");
    }
  };

  useEffect(() => {
    fetchProjects();

    fetchUsers();
  }, []);

  //create project
  const handleCreateProject = async () => {
    try {
      if (!projectName.trim()) return;

      await createProject({
        name: projectName,
      });

      setProjectName("");

      fetchProjects();

      showToast("Project created successfully");
    } catch (error) {
      showToast("Failed to create project", "error");
    }
  };

  // fetch project info
  const fetchProjectData = async (projectId) => {
    try {
      const taskData = await getTasksByProject(projectId);

      const memberData = await getProjectMembers(projectId);

      setTasks(taskData);

      setMembers(memberData);

      setSelectedProject(projectId);
    } catch (error) {
      showToast("Failed to load project data", "error");
    }
  };

  //adding member
  const handleAddMember = async () => {
    try {
      if (!selectedUser || !selectedProject) {
        return;
      }

      await addMemberToProject(selectedProject, Number(selectedUser));

      setSelectedUser("");

      fetchProjectData(selectedProject);

      showToast("Member added successfully");
    } catch (error) {
      // backup validation
      const message = error?.response?.data?.message || "Failed to add member";

      showToast(message, "error");
    }
  };

  // task input
  const handleTaskInput = (e) => {
    setTaskForm({
      ...taskForm,
      [e.target.name]: e.target.value,
    });
  };

  //create task
  const handleCreateTask = async () => {
    try {
      if (!taskForm.title || !taskForm.description || !taskForm.assignedTo) {
        return;
      }

      await createTask({
        title: taskForm.title,
        description: taskForm.description,
        projectId: selectedProject,
        assignedTo: Number(taskForm.assignedTo),
      });

      setTaskForm({
        title: "",
        description: "",
        assignedTo: "",
      });

      fetchProjectData(selectedProject);

      showToast("Task created successfully");
    } catch (error) {
      showToast("Failed to create task", "error");
    }
  };

  //delete task
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);

      fetchProjectData(selectedProject);

      showToast("Task deleted successfully");
    } catch (error) {
      showToast("Failed to delete task", "error");
    }
  };

  // logout
  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-lg shadow-lg
          ${toastType === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast}
        </div>
      )}

      
      <div className="border-b border-gray-800 px-8 py-5 flex justify-between items-center bg-gray-900 sticky top-0 z-40">
        <div>
          <h1 className="text-3xl font-bold">Task Manager</h1>

          <p className="text-gray-400 text-sm mt-1">Admin Workspace</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold">{localStorage.getItem("name")}</p>

            <p className="text-sm text-gray-400">
              {localStorage.getItem("role")}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-12 gap-6 p-6 h-[calc(100vh-88px)]">
        {/* LEFT PANEL */}
        <div className="col-span-4 bg-gray-900 rounded-2xl p-6 overflow-y-auto border border-gray-800">
          {/* CREATE PROJECT */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Create Project</h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 outline-none"
              />

              <button
                onClick={handleCreateProject}
                className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-semibold"
              >
                Create Project
              </button>
            </div>
          </div>

          
          <div>
            <h2 className="text-2xl font-bold mb-4">Projects</h2>

            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => fetchProjectData(project.id)}
                  className={`p-5 rounded-xl cursor-pointer border transition
                    ${
                      selectedProject === project.id
                        ? "bg-blue-700 border-blue-400"
                        : "bg-gray-800 border-gray-700"
                    }`}
                >
                  <h3 className="text-xl font-bold">{project.name}</h3>

                  <p className="text-gray-300 text-sm mt-2">
                    Click to manage project
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-8 bg-gray-900 rounded-2xl border border-gray-800 overflow-y-auto p-6">
          {!selectedProject ? (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <h2 className="text-4xl font-bold mb-4 text-gray-300">
                  Select a Project
                </h2>

                <p className="text-gray-500 text-lg">
                  Choose a project from the left panel to manage members and
                  tasks.
                </p>
              </div>
            </div>
          ) : (
            <>
              
              <div className="mb-8">
                <h2 className="text-3xl font-bold">Project Management</h2>

                <p className="text-gray-400 mt-2">
                  Manage members and tasks for selected project.
                </p>
              </div>

              
              <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
                <h3 className="text-2xl font-semibold mb-4">Add Member</h3>

                <div className="flex gap-4">
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="flex-1 p-3 rounded-lg bg-gray-700 outline-none"
                  >
                    <option value="">Select User</option>

                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={handleAddMember}
                    className="bg-green-600 hover:bg-green-500 px-6 rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>

              
              <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
                <h3 className="text-2xl font-semibold mb-4">Create Task</h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Task title"
                    value={taskForm.title}
                    onChange={handleTaskInput}
                    className="p-3 rounded-lg bg-gray-700 outline-none"
                  />

                  <select
                    name="assignedTo"
                    value={taskForm.assignedTo}
                    onChange={handleTaskInput}
                    className="p-3 rounded-lg bg-gray-700 outline-none"
                  >
                    <option value="">Select Member</option>

                    {members.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  name="description"
                  placeholder="Task description"
                  value={taskForm.description}
                  onChange={handleTaskInput}
                  rows="4"
                  className="w-full p-3 rounded-lg bg-gray-700 outline-none mb-4"
                />

                <button
                  onClick={handleCreateTask}
                  className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-lg font-semibold"
                >
                  Create Task
                </button>
              </div>

              {/* TASKS */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Tasks</h3>

                {tasks.length === 0 ? (
                  <div className="bg-gray-800 p-10 rounded-2xl text-center border border-gray-700">
                    <p className="text-gray-400 text-lg">No tasks found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-gray-800 p-6 rounded-2xl border border-gray-700"
                      >
                        <h3 className="text-2xl font-bold mb-3">
                          {task.title}
                        </h3>

                        <p className="text-gray-400 mb-4">{task.description}</p>

                        <div className="mb-4">
                          <span
                            className={`px-3 py-1 rounded text-sm font-semibold
                              ${
                                task.status === "DONE"
                                  ? "bg-green-600"
                                  : task.status === "IN_PROGRESS"
                                    ? "bg-yellow-600"
                                    : "bg-gray-600"
                              }`}
                          >
                            {task.status}
                          </span>
                        </div>

                        <p className="text-gray-400 mb-5">
                          Assigned To: {task.assignedUserName}
                        </p>

                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-lg"
                        >
                          Delete Task
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
