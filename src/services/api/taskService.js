import tasksData from "@/services/mockData/tasks.json";

// Simulate localStorage persistence
const STORAGE_KEY = "taskflow_tasks";

const getStoredTasks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : tasksData;
  } catch (error) {
    console.error("Error loading tasks from storage:", error);
    return tasksData;
  }
};

const storeTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to storage:", error);
  }
};

let tasks = getStoredTasks();

const delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));

export const taskService = {
  async getAll() {
    await delay();
    tasks = getStoredTasks();
    return [...tasks];
  },

  async getById(id) {
    await delay();
    tasks = getStoredTasks();
    const task = tasks.find(t => t.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await delay();
    tasks = getStoredTasks();
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    const newTask = {
      Id: maxId + 1,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    storeTasks(tasks);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay();
    tasks = getStoredTasks();
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index !== -1) {
      if (updates.completed && !tasks[index].completed) {
        updates.completedAt = new Date().toISOString();
      } else if (!updates.completed && tasks[index].completed) {
        updates.completedAt = null;
      }
      tasks[index] = { ...tasks[index], ...updates };
      storeTasks(tasks);
      return { ...tasks[index] };
    }
    return null;
  },

  async delete(id) {
    await delay();
    tasks = getStoredTasks();
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index !== -1) {
      const deletedTask = tasks.splice(index, 1)[0];
      storeTasks(tasks);
      return { ...deletedTask };
    }
    return null;
  },

  async getByListId(listId) {
    await delay();
    tasks = getStoredTasks();
    return tasks.filter(t => t.listId === listId.toString()).map(t => ({ ...t }));
  },

  async getByStatus(completed) {
    await delay();
    tasks = getStoredTasks();
    return tasks.filter(t => t.completed === completed).map(t => ({ ...t }));
  },

  async search(query) {
    await delay();
    tasks = getStoredTasks();
    const lowerQuery = query.toLowerCase();
    return tasks.filter(t => 
      t.title.toLowerCase().includes(lowerQuery) || 
      t.description.toLowerCase().includes(lowerQuery)
    ).map(t => ({ ...t }));
  }
};