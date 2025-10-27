import listsData from "@/services/mockData/lists.json";
import { taskService } from "./taskService.js";

const STORAGE_KEY = "taskflow_lists";

const getStoredLists = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : listsData;
  } catch (error) {
    console.error("Error loading lists from storage:", error);
    return listsData;
  }
};

const storeLists = (lists) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  } catch (error) {
    console.error("Error saving lists to storage:", error);
  }
};

let lists = getStoredLists();

const delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));

export const listService = {
  async getAll() {
    await delay();
    lists = getStoredLists();
    // Update task counts
    const allTasks = await taskService.getAll();
    const updatedLists = lists.map(list => ({
      ...list,
      taskCount: allTasks.filter(task => task.listId === list.Id.toString()).length
    }));
    return updatedLists;
  },

  async getById(id) {
    await delay();
    lists = getStoredLists();
    const list = lists.find(l => l.Id === parseInt(id));
    if (list) {
      const tasks = await taskService.getByListId(id);
      return { ...list, taskCount: tasks.length };
    }
    return null;
  },

  async create(listData) {
    await delay();
    lists = getStoredLists();
    const maxId = lists.length > 0 ? Math.max(...lists.map(l => l.Id)) : 0;
    const newList = {
      Id: maxId + 1,
      ...listData,
      taskCount: 0,
      createdAt: new Date().toISOString()
    };
    lists.push(newList);
    storeLists(lists);
    return { ...newList };
  },

  async update(id, updates) {
    await delay();
    lists = getStoredLists();
    const index = lists.findIndex(l => l.Id === parseInt(id));
    if (index !== -1) {
      lists[index] = { ...lists[index], ...updates };
      storeLists(lists);
      const tasks = await taskService.getByListId(id);
      return { ...lists[index], taskCount: tasks.length };
    }
    return null;
  },

  async delete(id) {
    await delay();
    lists = getStoredLists();
    const index = lists.findIndex(l => l.Id === parseInt(id));
    if (index !== -1) {
      const deletedList = lists.splice(index, 1)[0];
      storeLists(lists);
      return { ...deletedList };
    }
    return null;
  }
};