import TaskCard from "./TaskCard.jsx";

const TaskColumn = ({ title, tasks, bgColor }) => (
  <div className="flex-1 min-w-0">
    <div className={`${bgColor} p-3 rounded-t-lg`}>
      <h2 className="font-semibold text-white text-sm flex items-center justify-between">
        {title}
        <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
            {tasks.length}
          </span>
      </h2>
    </div>
    <div className="bg-gray-50 p-3 rounded-b-lg min-h-96">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
      {tasks.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          <p className="text-sm">No tasks</p>
        </div>
      )}
    </div>
  </div>
);

export default TaskColumn;