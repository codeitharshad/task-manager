import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyTasks, updateTaskStatus } from "../api/taskApi";

function MemberDashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [toast, setToast] = useState("");

  //toast helper
  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  // fetch tasks
  const fetchTasks = async () => {
    try {
      const data = await getMyTasks();

      setTasks(data);
    } catch (error) {
      showToast("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusUpdate = async (taskId, status) => {
    try {
      await updateTaskStatus(taskId, status);

      fetchTasks();

      showToast("Task status updated");
    } catch (error) {
      showToast("Failed to update task");
    }
  };

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.status === "DONE").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  ).length;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-green-600 px-6 py-3 rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      <div className="border-b border-gray-800 px-8 py-5 flex justify-between items-center bg-gray-900 sticky top-0 z-40">
        <div>
          <h1 className="text-3xl font-bold">Task Manager</h1>

          <p className="text-gray-400 text-sm mt-1">Member Workspace</p>
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
        <div className="col-span-4 bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="mb-10">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold mb-4">
              {localStorage.getItem("name")?.charAt(0)}
            </div>

            <h2 className="text-2xl font-bold">
              {localStorage.getItem("name")}
            </h2>

            <p className="text-gray-400 mt-1">
              {localStorage.getItem("email")}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-5">Task Overview</h3>

            <div className="space-y-4">
              <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Total Tasks</p>

                <h4 className="text-3xl font-bold">{totalTasks}</h4>
              </div>

              <div className="bg-green-700 p-5 rounded-xl">
                <p className="text-sm mb-2">Completed</p>

                <h4 className="text-3xl font-bold">{completedTasks}</h4>
              </div>

              <div className="bg-yellow-600 p-5 rounded-xl">
                <p className="text-sm mb-2">In Progress</p>

                <h4 className="text-3xl font-bold">{inProgressTasks}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-8 bg-gray-900 rounded-2xl border border-gray-800 overflow-y-auto p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">My Tasks</h2>

            <p className="text-gray-400 mt-2">
              Track and update your assigned tasks.
            </p>
          </div>

          {tasks.length === 0 ? (
            <div className="h-[70vh] flex items-center justify-center text-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-300 mb-4">
                  No Tasks Assigned
                </h3>

                <p className="text-gray-500 text-lg">
                  You currently have no assigned tasks.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-800 p-6 rounded-2xl border border-gray-700"
                >
                  <h3 className="text-2xl font-bold mb-3">{task.title}</h3>

                  <p className="text-gray-400 mb-5">{task.description}</p>

                  <div className="mb-5">
                    <p className="text-sm text-gray-400 mb-2">Current Status</p>

                    <span
                      className={`px-4 py-2 rounded text-sm font-semibold
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

                  <div>
                    <p className="text-sm text-gray-400 mb-2">Update Status</p>

                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusUpdate(task.id, e.target.value)
                      }
                      className="w-full p-3 rounded-lg bg-gray-700 outline-none"
                    >
                      <option value="TODO">TODO</option>

                      <option value="IN_PROGRESS">IN_PROGRESS</option>

                      <option value="DONE">DONE</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
