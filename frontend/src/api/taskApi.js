const BASE_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("token");
};

//to get task of perticular member
export const getMyTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks/my`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};

//to get tasks of pertucular project
export const getTasksByProject = async (projectId) => {
  const response = await fetch(`${BASE_URL}/tasks/project/${projectId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};

//to create a new project
export const createTask = async (data) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

//to change the tasks status
export const updateTaskStatus = async (taskId, status) => {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ status }),
  });

  return response.json();
};

//to delelte the task
export const deleteTask = async (taskId) => {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};
