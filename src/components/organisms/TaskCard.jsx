import React from "react";
import { motion } from "framer-motion";
import { format, isPast, isToday, isTomorrow, parseISO } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import { cn } from "@/utils/cn";

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  className 
}) => {
  const { 
    Id, 
    title_c, 
    description_c, 
    priority_c, 
    due_date_c, 
    completed_c, 
    list_id_c 
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
        priorityStyles[priority_c],
        completed_c && "task-completed",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
<div className="pt-1">
            <Checkbox
              checked={completed_c}
              onChange={() => onToggleComplete(Id)}
            />
          </div>
          
          <div className="flex-1 min-w-0">
<h3 className={cn(
              "text-lg font-semibold text-gray-900 mb-2",
              completed_c && "line-through opacity-60"
            )}>
              {title_c}
            </h3>
            
            {description_c && (
<p className={cn(
                "text-gray-600 mb-4",
                completed_c && "opacity-60"
              )}>
                {description_c}
              </p>
            )}
            
            <div className="flex items-center space-x-3">
<Badge variant={priority_c} size="sm">
                {priority_c.charAt(0).toUpperCase() + priority_c.slice(1)}
              </Badge>
              
{due_date_c && (
                <Badge 
                  variant={completed_c ? "default" : getDueDateColor(due_date_c)} 
                  size="sm"
                >
                  <ApperIcon name="Calendar" size={12} className="mr-1" />
                  {formatDueDate(due_date_c)}
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