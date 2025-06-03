import {Edit, Trash2} from "lucide-react";
import React from "react";

const TaskCard = ({ task,setEditingTask,deleteTask }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>
      <div className="flex gap-1">
        <button
          onClick={() => setEditingTask(task)}
          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
        >
          <Edit size={14} />
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
    <p className="text-gray-600 text-xs mb-3">{task.description}</p>
    <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          task.priority === 'high' ? 'bg-red-100 text-red-800' :
            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
        }`}>
          {task.priority}
        </span>
      <span className="text-xs text-gray-500">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
    </div>
  </div>
);

export default TaskCard;