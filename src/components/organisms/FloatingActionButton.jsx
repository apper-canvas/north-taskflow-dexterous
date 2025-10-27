import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FloatingActionButton = ({ onClick }) => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={onClick}
        className="w-14 h-14 rounded-full shadow-2xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 p-0 border-0"
      >
        <ApperIcon name="Plus" size={24} />
      </Button>
    </motion.div>
  );
};

export default FloatingActionButton;