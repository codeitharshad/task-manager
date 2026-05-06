const BASE_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("token");
};

// to get all users
export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};
