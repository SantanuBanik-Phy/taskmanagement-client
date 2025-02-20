

const TaskItem = ({ task, onEdit, onDelete }) => {
  // Format the timestamp for display
  const formattedDate = new Date(task.timestamp).toLocaleString();

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md flex justify-between items-center">
      {/* Task Content */}
      <div className="flex-1">
        <h4 className="font-semibold text-lg truncate">{task.title}</h4>
        {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
        <p className="text-xs text-gray-500 mt-1">Category: {task.category}</p>
        <p className="text-xs text-gray-400">Created: {formattedDate}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded transition duration-200"
        >
          ✏️ Edit
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 px-2 py-1 rounded transition duration-200"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
