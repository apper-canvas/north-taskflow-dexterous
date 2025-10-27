import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { format, isToday, isTomorrow, isPast, parseISO } from "date-fns";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  className 
}) => {
  const { 
    Id, 
    title, 
    description, 
    priority, 
    dueDate, 
    completed, 
    listId 
  } = task;
  
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const date = parseISO(dateString);
    
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d, yyyy");
  };
  
  const getDueDateColor = (dateString) => {
    if (!dateString) return "default";
    
    const date = parseISO(dateString);
    
    if (isPast(date) && !isToday(date)) return "danger";
    if (isToday(date)) return "warning";
    return "default";
  };
  
  const priorityStyles = {
    high: "task-priority-high",
    medium: "task-priority-medium", 
    low: "task-priority-low"
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm border hover:shadow-lg transition-all duration-200",
        priorityStyles[priority],
        completed && "task-completed",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="pt-1">
            <Checkbox
              checked={completed}
              onChange={() => onToggleComplete(Id)}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "text-lg font-semibold text-gray-900 mb-2",
              completed && "line-through opacity-60"
            )}>
              {title}
            </h3>
            
            {description && (
              <p className={cn(
                "text-gray-600 mb-4",
                completed && "opacity-60"
              )}>
                {description}
              </p>
            )}
            
            <div className="flex items-center space-x-3">
              <Badge variant={priority} size="sm">
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Badge>
              
              {dueDate && (
                <Badge 
                  variant={completed ? "default" : getDueDateColor(dueDate)} 
                  size="sm"
                >
                  <ApperIcon name="Calendar" size={12} className="mr-1" />
                  {formatDueDate(dueDate)}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <ApperIcon name="Edit2" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(Id)}
            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
          >
            <ApperIcon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;