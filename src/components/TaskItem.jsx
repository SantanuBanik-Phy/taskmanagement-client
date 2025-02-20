import { FaEdit, FaTrashAlt } from "react-icons/fa";  // Importing React Icons

const TaskItem = ({ task, onEdit, onDelete }) => {
  // Format the timestamp for display
  const formattedDate = new Date(task.timestamp).toLocaleString();

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md flex justify-between items-center space-x-4 hover:bg-gray-50 transition duration-200">
      {/* Task Content */}
      <div className="flex-1">
        <h4 className="font-semibold text-lg text-gray-800 truncate">{task.title}</h4>
        {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
        <p className="text-xs text-gray-500 mt-1">Category: <span className="font-medium">{task.category}</span></p>
        <p className="text-xs text-gray-400 mt-1">Created: {formattedDate}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 p-2 rounded-md hover:bg-blue-100 transition duration-200"
        >
          <FaEdit size={20} />
        </button>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-100 transition duration-200"
        >
          <FaTrashAlt size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
