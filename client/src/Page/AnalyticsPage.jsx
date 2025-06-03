const AnalyticsPage = ({tasks}) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'inprogress').length;
  const todoTasks = tasks.filter(t => t.status === 'todo').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Track your productivity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Star className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600">{inProgressTasks}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-purple-600">{completionRate}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Task Distribution</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">To Do</span>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${totalTasks > 0 ? (todoTasks / totalTasks) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-900 w-8">{todoTasks}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">In Progress</span>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${totalTasks > 0 ? (inProgressTasks / totalTasks) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-900 w-8">{inProgressTasks}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Done</span>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-900 w-8">{completedTasks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage