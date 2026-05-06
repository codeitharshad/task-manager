const BASE_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("token");
};

export const getProjects = async () => {
  const response = await fetch(`${BASE_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};

export const createProject = async (data) => {
  const response = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const getProjectMembers = async (projectId) => {
  const response = await fetch(`${BASE_URL}/projects/${projectId}/members`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};

export const addMemberToProject = async (projectId, userId) => {
  const response = await fetch(`${BASE_URL}/projects/${projectId}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      userId,
    }),
  });

  return response.json();
};
