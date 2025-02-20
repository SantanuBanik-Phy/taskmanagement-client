import { useSortable } from "@dnd-kit/sortable";

const DragHandle = ({ task }) => { // Add task as a prop
  const { attributes, listeners } = useSortable({ id: task._id }); // Now you can access task._id
  return (
    <div
      {...attributes}
      {...listeners}
      className="cursor-grab p-2 flex justify-center items-center bg-gray-200 rounded-md"
    >
      <span className="text-gray-500">☰</span>
    </div>
  );
};

export default DragHandle;