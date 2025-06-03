import {X} from "lucide-react";
import React from "react";

const ProfileModal = ({setShowProfile,user,tasks}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Profile</h3>
        <button onClick={() => setShowProfile(false)} className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>
      <div className="text-center mb-6">
        <img
          src={user?.avatar}
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
        />
        <h4 className="text-lg font-semibold text-gray-900">{user?.name}</h4>
        <p className="text-gray-600">{user?.email}</p>
        <p className="text-sm text-gray-500 mt-2">
          Member since {new Date(user?.joinDate).toLocaleDateString()}
        </p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">Total Tasks</span>
          <span className="text-sm text-gray-600">{tasks.length}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">Completed</span>
          <span className="text-sm text-gray-600">
              {tasks.filter(t => t.status === 'done').length}
            </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">In Progress</span>
          <span className="text-sm text-gray-600">
              {tasks.filter(t => t.status === 'inprogress').length}
            </span>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileModal;