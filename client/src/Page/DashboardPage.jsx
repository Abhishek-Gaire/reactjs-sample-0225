import {Plus, Search} from "lucide-react";
import React from "react";

import TaskColumn from "../components/TaskColumn.jsx";

const DashboardPage = ({filteredTasks,setShowAddTask,loading,searchTerm,setSearchTerm,filterStatus,setFilterStatus}) => {
  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'inprogress');
  const doneTasks = filteredTasks.filter(task => task.status === 'done');

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
          <p className="text-gray-600">Manage your tasks efficiently</p>
        </div>
        <button
          onClick={() => setShowAddTask(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          disabled={loading}
        >
          <option value="all">All Tasks</option>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TaskColumn
          title="To Do"
          status="todo"
          tasks={todoTasks}
          bgColor="bg-red-500"
        />
        <TaskColumn
          title="In Progress"
          status="inprogress"
          tasks={inProgressTasks}
          bgColor="bg-yellow-500"
        />
        <TaskColumn
          title="Done"
          status="done"
          tasks={doneTasks}
          bgColor="bg-green-500"
        />
      </div>
    </div>
  );
};

export default DashboardPage;