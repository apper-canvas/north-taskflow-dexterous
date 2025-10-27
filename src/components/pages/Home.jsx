import React, { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import { listService } from "@/services/api/listService";
import SearchBar from "@/components/molecules/SearchBar";
import FilterTabs from "@/components/molecules/FilterTabs";
import TaskList from "@/components/organisms/TaskList";
import TaskModal from "@/components/organisms/TaskModal";
import FloatingActionButton from "@/components/organisms/FloatingActionButton";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Load data
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      
      const [tasksData, listsData] = await Promise.all([
        taskService.getAll(),
        listService.getAll()
      ]);
      
      setTasks(tasksData);
      setLists(listsData);
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadData();
  }, [loadData]);
  
  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];
    
    // Apply search filter
if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        (task.title_c || "").toLowerCase().includes(query) ||
        (task.description_c || "").toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
if (activeFilter === "active") {
      filtered = filtered.filter(task => !task.completed_c);
    } else if (activeFilter === "completed") {
      filtered = filtered.filter(task => task.completed_c);
    }
    
    // Sort by priority and due date
    filtered.sort((a, b) => {
// Completed tasks go to bottom
      if (a.completed_c !== b.completed_c) {
        return a.completed_c ? 1 : -1;
      }
      
      // Priority order
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority_c] !== priorityOrder[b.priority_c]) {
        return priorityOrder[b.priority_c] - priorityOrder[a.priority_c];
      }
      
      // Due date order (null dates go last)
      if (a.due_date_c && !b.due_date_c) return -1;
      if (!a.due_date_c && b.due_date_c) return 1;
      if (a.due_date_c && b.due_date_c) {
        return new Date(a.due_date_c) - new Date(b.due_date_c);
      }
      
      // Created date order
      return new Date(b.created_at_c) - new Date(a.created_at_c);
    });
    
    return filtered;
  }, [tasks, searchQuery, activeFilter]);
  
  // Filter tabs data
  const filterTabs = useMemo(() => [
    { 
      value: "all", 
      label: "All", 
      count: tasks.length 
    },
{ 
      value: "active", 
      label: "Active", 
      count: tasks.filter(task => !task.completed_c).length 
    },
    { 
      value: "completed", 
      label: "Completed", 
      count: tasks.filter(task => task.completed_c).length 
    }
  ], [tasks]);
  
  // Task actions
const handleToggleComplete = async (taskId) => {
    const task = tasks.find(t => t.Id === taskId);
    if (!task) return;
    
    try {
      const updatedTask = await taskService.update(taskId, {
        completed_c: !task.completed_c
      });
      
      setTasks(prev => prev.map(t => 
        t.Id === taskId ? updatedTask : t
      ));
      
      toast.success(
        updatedTask.completed 
          ? "Task completed! 🎉" 
          : "Task marked as active"
      );
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error("Failed to update task");
    }
  };
  
  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const updatedTask = await taskService.update(editingTask.Id, taskData);
        setTasks(prev => prev.map(t => 
          t.Id === editingTask.Id ? updatedTask : t
        ));
        toast.success("Task updated successfully");
      } else {
        const newTask = await taskService.create(taskData);
        setTasks(prev => [newTask, ...prev]);
        toast.success("Task created successfully");
      }
    } catch (err) {
      console.error("Error saving task:", err);
      toast.error("Failed to save task");
      throw err;
    }
  };
  
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };
  
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.Id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to delete task");
    }
  };
  
  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };
  
  // Loading state
  if (loading) {
    return <Loading />;
  }
  
  // Error state
  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">TaskFlow</h1>
              <p className="text-gray-600">
                {tasks.filter(t => !t.completed).length} active tasks
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <ApperIcon name="CheckSquare" size={24} className="text-white" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search your tasks..."
            />
            
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              filters={filterTabs}
            />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onAddTask={handleAddTask}
        />
      </div>
      
      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleAddTask} />
      
      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        task={editingTask}
        lists={lists}
      />
    </div>
  );
};

export default Home;