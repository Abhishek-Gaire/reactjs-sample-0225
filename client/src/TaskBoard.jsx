import React, { useState, useEffect } from "react";
import { X, User, Settings, Calendar, Star } from "lucide-react";
import SettingsPage from "./Page/SettingsPage.jsx";
import AnalyticsPage from "./Page/AnalyticsPage.jsx";
import DashboardPage from "./Page/DashboardPage.jsx";
import Loading from "./components/Loading.jsx";
import ProfileModal from "./components/ProfileModal.jsx";
import TaskForm from "./Page/TaskForm.jsx";

const TaskBoard = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [notification, setNotification] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  // API base URL - change this to your deployed backend URL
  const API_BASE_URL = "http://localhost:5000/api";

  // API helper functions
  const apiCall = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "API request failed");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await apiCall("/tasks");
      setTasks(response.data || []);
    } catch (error) {
      showNotification("Failed to fetch tasks. Using offline mode.");
      // Fallback to sample data if API fails
      setTasks([
        {
          id: "1",
          title: "Design Homepage",
          description:
            "Create wireframes and mockups for the new homepage design",
          priority: "high",
          status: "todo",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await apiCall("/users/profile");
      setUser(response.data);
    } catch (error) {
      // Fallback user data if API fails
      const randomId = Math.floor(Math.random() * 1000);
      setUser({
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: `https://picsum.photos/id/${randomId}/200/200`,
        joinDate: "2024-01-15",
      });
    }
  };

  // Initialize data
  useEffect(() => {
    fetchTasks();
    fetchUserProfile();
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const addTask = async (taskData) => {
    try {
      setLoading(true);
      const response = await apiCall("/tasks", {
        method: "POST",
        body: JSON.stringify(taskData),
      });

      setTasks([response.data, ...tasks]);
      setShowAddTask(false);
      showNotification("Task added successfully!");
    } catch (error) {
      showNotification("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      setLoading(true);
      const response = await apiCall(`/tasks/${taskId}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      });

      setTasks(
        tasks.map((task) => (task.id === taskId ? response.data : task))
      );
      setEditingTask(null);
      showNotification("Task updated successfully!");
    } catch (error) {
      showNotification("Failed to update task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      await apiCall(`/tasks/${taskId}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task.id !== taskId));
      showNotification("Task deleted successfully!");
    } catch (error) {
      showNotification("Failed to delete task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const moveTask = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (!user) {
    <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="bg-white shadow-lg lg:w-64 lg:flex-shrink-0">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="hidden lg:block">
              <h3 className="font-semibold text-gray-900">{user?.name}</h3>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>
        <nav className="p-4">
          <div className="flex lg:flex-col gap-2">
            <button
              onClick={() => setCurrentPage("dashboard")}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                currentPage === "dashboard"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Calendar size={20} />
              <span className="hidden lg:inline">Dashboard</span>
            </button>
            <button
              onClick={() => setCurrentPage("analytics")}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                currentPage === "analytics"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Star size={20} />
              <span className="hidden lg:inline">Analytics</span>
            </button>
            <button
              onClick={() => setCurrentPage("settings")}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                currentPage === "settings"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Settings size={20} />
              <span className="hidden lg:inline">Settings</span>
            </button>
            <button
              onClick={() => setShowProfile(true)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors lg:hidden"
            >
              <User size={20} />
            </button>
          </div>
        </nav>
        <div className="hidden lg:block p-4 border-t border-gray-200 mt-auto">
          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full"
          >
            <User size={20} />
            View Profile
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {currentPage === "dashboard" && (
          <DashboardPage
            filteredTasks={filteredTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            setEditingTask={setEditingTask}
            loading={loading}
            setShowAddTask={setShowAddTask}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        )}
        {currentPage === "analytics" && <AnalyticsPage tasks={tasks} />}
        {currentPage === "settings" && <SettingsPage user={user} />}
      </div>

      {/* Modals */}
      {showAddTask && (
        <TaskForm onSubmit={addTask} onCancel={() => setShowAddTask(false)} />
      )}

      {editingTask && (
        <TaskForm
          task={editingTask}
          onSubmit={(data) => updateTask(editingTask.id, data)}
          onCancel={() => setEditingTask(null)}
        />
      )}

      {showProfile && <ProfileModal />}

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
