import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import PrioritySelector from "@/components/molecules/PrioritySelector";
import DatePicker from "@/components/molecules/DatePicker";
import ApperIcon from "@/components/ApperIcon";

const TaskModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  task = null,
  lists = []
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: null,
    listId: "1"
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate || null,
        listId: task.listId || "1"
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: null,
        listId: "1"
      });
    }
    setErrors({});
  }, [task, isOpen]);
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
    } finally {
      setLoading(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">
              {task ? "Edit Task" : "Create New Task"}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
            >
              <ApperIcon name="X" size={20} />
            </Button>
          </div>
          
          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Task Title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                error={errors.title}
                required
              />
              
              <Textarea
                label="Description"
                placeholder="Add a description (optional)"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
              />
              
              <PrioritySelector
                value={formData.priority}
                onChange={(value) => handleInputChange("priority", value)}
              />
              
              <DatePicker
                label="Due Date"
                value={formData.dueDate}
                onChange={(value) => handleInputChange("dueDate", value)}
              />
              
              <Select
                label="List"
                value={formData.listId}
                onChange={(e) => handleInputChange("listId", e.target.value)}
              >
                {lists.map((list) => (
                  <option key={list.Id} value={list.Id.toString()}>
                    {list.name}
                  </option>
                ))}
              </Select>
            </form>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-100">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={loading}
              disabled={loading}
            >
              {task ? "Update Task" : "Create Task"}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;