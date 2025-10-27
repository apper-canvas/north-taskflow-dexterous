import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "./TaskCard";
import Empty from "@/components/ui/Empty";

const TaskList = ({ 
  tasks, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  onAddTask 
}) => {
  if (tasks.length === 0) {
    return (
      <Empty
        title="No tasks found"
        description="Get started by adding your first task or adjust your filters"
        actionText="Add Task"
        onAction={onAddTask}
      />
    );
  }
  
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.Id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;