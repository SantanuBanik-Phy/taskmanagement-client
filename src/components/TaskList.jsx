import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { useAuth } from "../provider/AuthProvider";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragHandle from "./DragHandle";  // The Drag Handle component
import Loading from "./Loading";


const TaskList = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState({});
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  // Fetch tasks
  const { isLoading, error, data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      if (user) {
        const token = await user.getIdToken();
        const response = await axios.get("http://localhost:3000/tasks", {
          headers: { Authorization: token },
        });
        return Array.isArray(response.data) ? response.data : [];
      }
      return [];
    },
  });

  // Real-time WebSocket connection
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const updatedTasks = JSON.parse(event.data);
      queryClient.setQueryData(["tasks"], updatedTasks);
    };

    return () => ws.close();
  }, []);

  // Task mutations
  const addTaskMutation = useMutation({
    mutationFn: async (newTask) => {
      const token = await user.getIdToken();
      return axios.post("http://localhost:3000/tasks", {...newTask, id: Date.now().toString() }, {
        headers: { Authorization: token },
      });
    },
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask) => {
      const token = await user.getIdToken();
      return axios.put(`http://localhost:3000/tasks/${updatedTask._id}`, updatedTask, {
        headers: { Authorization: token },
      });
    },
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries(["tasks"]);
      const previousTasks = queryClient.getQueryData(["tasks"]);
      queryClient.setQueryData(["tasks"], (old) =>
        old.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
      return { previousTasks };
    },
    onError: (err, updatedTask, context) => {
      queryClient.setQueryData(["tasks"], context.previousTasks);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setIsEditing(false);
      setEditTask({});
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id) => {
      const token = await user.getIdToken();
      return axios.delete(`http://localhost:3000/tasks/${id}`, {
        headers: { Authorization: token },
      });
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries(["tasks"]);
      const previousTasks = queryClient.getQueryData(["tasks"]);
      queryClient.setQueryData(["tasks"], (old) => old.filter((task) => task._id !== id));
      return { previousTasks };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["tasks"], context.previousTasks);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  // Drag-and-Drop Configuration
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
  
    const activeIndex = tasks.findIndex((task) => task._id === active.id);
    const overIndex = tasks.findIndex((task) => task._id === over.id);
  
    // Determine the new index based on the drag direction
    let newIndex = overIndex;
    if (activeIndex < overIndex) {
      newIndex = overIndex - 1; // If dragging down, insert before the over item
    }
  
    // Reorder the tasks array
    const updatedTasks = arrayMove(tasks, activeIndex, newIndex);
  
    // Update the category of the reordered task
    const updatedTask = {...updatedTasks[newIndex], category: updatedTasks[newIndex].category };
  
    // Update the tasks in the database (or adjust task data as needed)
    updateTaskMutation.mutate(updatedTask);
  };

  if (isLoading) return <div><Loading></Loading></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Task List</h2>

      {/* Add Task Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTaskMutation.mutate(newTask);
          setNewTask({ id: Date.now().toString(), title: "", description: "", category: "To-Do" });
        }}
        className="mb-6 flex gap-4 justify-center flex-wrap"
      >
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="border rounded px-3 py-2 w-full sm:w-64 mb-2"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description (optional)"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="border rounded px-3 py-2 w-full sm:w-64 mb-2"
        />
        <select
          value={newTask.category}
          onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
          className="border rounded-md px-3 py-2 w-full sm:w-32 mb-2"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit" className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold px-6 py-3 rounded-lg">
          Add Task
        </button>
      </form>

      {/* Task List with Drag and Drop */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
          {Array.isArray(tasks) &&
            tasks.map((task) => (
              <SortableTask key={task._id} task={task} deleteTaskMutation={deleteTaskMutation} setIsEditing={setIsEditing} setEditTask={setEditTask} />
            ))}
        </SortableContext>
      </DndContext>

      {/* Edit Task Modal */}
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-96 transform transition-transform duration-500 scale-95 hover:scale-100">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Edit Task</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateTaskMutation.mutate(editTask);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="title" className="block text-gray-700">Task Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={editTask.description}
                  onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Sortable Task Item Component
const SortableTask = ({ task, deleteTaskMutation, setIsEditing, setEditTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="border rounded p-2 mb-2 flex items-center">
      {/* Add dedicated drag handle */}
      <DragHandle task={task} />
      
      <div className="flex-1">
        <TaskItem 
          task={task} 
          onDelete={(e) => {
            e.stopPropagation(); // Prevent drag from being triggered
            deleteTaskMutation.mutate(task._id);
          }}
          onEdit={(e) => {
            e.stopPropagation(); // Prevent drag from being triggered
            setIsEditing(true);
            setEditTask(task);
          }} 
        />
      </div>
    </div>
  );
};

export default TaskList;
