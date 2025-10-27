import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

export const taskService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "list_id_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 1000, "offset": 0}
      };
      
      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      if (!response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data.map(task => ({
        Id: task.Id,
        title_c: task.title_c || "",
        description_c: task.description_c || "",
        priority_c: task.priority_c || "medium",
        due_date_c: task.due_date_c || null,
        completed_c: task.completed_c || false,
        completed_at_c: task.completed_at_c || null,
        list_id_c: task.list_id_c?.Id || task.list_id_c || null,
        created_at_c: task.created_at_c || new Date().toISOString()
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "list_id_c"}},
          {"field": {"Name": "created_at_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById('task_c', id, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      if (!response.data) {
        return null;
      }
      
      return {
        Id: response.data.Id,
        title_c: response.data.title_c || "",
        description_c: response.data.description_c || "",
        priority_c: response.data.priority_c || "medium",
        due_date_c: response.data.due_date_c || null,
        completed_c: response.data.completed_c || false,
        completed_at_c: response.data.completed_at_c || null,
        list_id_c: response.data.list_id_c?.Id || response.data.list_id_c || null,
        created_at_c: response.data.created_at_c || new Date().toISOString()
      };
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(taskData) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [{
          title_c: taskData.title_c || taskData.title || "",
          description_c: taskData.description_c || taskData.description || "",
          priority_c: taskData.priority_c || taskData.priority || "medium",
          due_date_c: taskData.due_date_c || taskData.dueDate || null,
          completed_c: taskData.completed_c || taskData.completed || false,
          completed_at_c: taskData.completed_at_c || taskData.completedAt || null,
          list_id_c: taskData.list_id_c ? parseInt(taskData.list_id_c) : (taskData.listId ? parseInt(taskData.listId) : null),
          created_at_c: new Date().toISOString()
        }]
      };
      
      const response = await apperClient.createRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} tasks:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          const created = successful[0].data;
          return {
            Id: created.Id,
            title_c: created.title_c || "",
            description_c: created.description_c || "",
            priority_c: created.priority_c || "medium",
            due_date_c: created.due_date_c || null,
            completed_c: created.completed_c || false,
            completed_at_c: created.completed_at_c || null,
            list_id_c: created.list_id_c?.Id || created.list_id_c || null,
            created_at_c: created.created_at_c || new Date().toISOString()
          };
        }
      }
      return null;
    } catch (error) {
      console.error("Error creating task:", error?.response?.data?.message || error);
      return null;
    }
  },

  async update(id, updates) {
    try {
      const apperClient = getApperClient();
      
      const updateData = {
        Id: parseInt(id)
      };
      
      if (updates.title_c !== undefined) updateData.title_c = updates.title_c;
      if (updates.title !== undefined) updateData.title_c = updates.title;
      if (updates.description_c !== undefined) updateData.description_c = updates.description_c;
      if (updates.description !== undefined) updateData.description_c = updates.description;
      if (updates.priority_c !== undefined) updateData.priority_c = updates.priority_c;
      if (updates.priority !== undefined) updateData.priority_c = updates.priority;
      if (updates.due_date_c !== undefined) updateData.due_date_c = updates.due_date_c;
      if (updates.dueDate !== undefined) updateData.due_date_c = updates.dueDate;
      if (updates.completed_c !== undefined) {
        updateData.completed_c = updates.completed_c;
        updateData.completed_at_c = updates.completed_c ? new Date().toISOString() : null;
      }
      if (updates.completed !== undefined) {
        updateData.completed_c = updates.completed;
        updateData.completed_at_c = updates.completed ? new Date().toISOString() : null;
      }
      if (updates.completed_at_c !== undefined) updateData.completed_at_c = updates.completed_at_c;
      if (updates.completedAt !== undefined) updateData.completed_at_c = updates.completedAt;
      if (updates.list_id_c !== undefined) updateData.list_id_c = parseInt(updates.list_id_c);
      if (updates.listId !== undefined) updateData.list_id_c = parseInt(updates.listId);
      
      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} tasks:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          const updated = successful[0].data;
          return {
            Id: updated.Id,
            title_c: updated.title_c || "",
            description_c: updated.description_c || "",
            priority_c: updated.priority_c || "medium",
            due_date_c: updated.due_date_c || null,
            completed_c: updated.completed_c || false,
            completed_at_c: updated.completed_at_c || null,
            list_id_c: updated.list_id_c?.Id || updated.list_id_c || null,
            created_at_c: updated.created_at_c || new Date().toISOString()
          };
        }
      }
      return null;
    } catch (error) {
      console.error("Error updating task:", error?.response?.data?.message || error);
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} tasks:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0;
      }
      return false;
    } catch (error) {
      console.error("Error deleting task:", error?.response?.data?.message || error);
      return false;
    }
  },

  async getByListId(listId) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "list_id_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        where: [{"FieldName": "list_id_c", "Operator": "EqualTo", "Values": [parseInt(listId)]}],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 1000, "offset": 0}
      };
      
      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      if (!response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data.map(task => ({
        Id: task.Id,
        title_c: task.title_c || "",
        description_c: task.description_c || "",
        priority_c: task.priority_c || "medium",
        due_date_c: task.due_date_c || null,
        completed_c: task.completed_c || false,
        completed_at_c: task.completed_at_c || null,
        list_id_c: task.list_id_c?.Id || task.list_id_c || null,
        created_at_c: task.created_at_c || new Date().toISOString()
      }));
    } catch (error) {
      console.error("Error fetching tasks by list:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getByStatus(completed) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "list_id_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        where: [{"FieldName": "completed_c", "Operator": "EqualTo", "Values": [completed]}],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 1000, "offset": 0}
      };
      
      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      if (!response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data.map(task => ({
        Id: task.Id,
        title_c: task.title_c || "",
        description_c: task.description_c || "",
        priority_c: task.priority_c || "medium",
        due_date_c: task.due_date_c || null,
        completed_c: task.completed_c || false,
        completed_at_c: task.completed_at_c || null,
        list_id_c: task.list_id_c?.Id || task.list_id_c || null,
        created_at_c: task.created_at_c || new Date().toISOString()
      }));
    } catch (error) {
      console.error("Error fetching tasks by status:", error?.response?.data?.message || error);
      return [];
    }
  },

  async search(query) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "list_id_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {"conditions": [{"fieldName": "title_c", "operator": "Contains", "values": [query]}], "operator": "OR"},
            {"conditions": [{"fieldName": "description_c", "operator": "Contains", "values": [query]}], "operator": "OR"}
          ]
        }],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 1000, "offset": 0}
      };
      
      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      if (!response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data.map(task => ({
        Id: task.Id,
        title_c: task.title_c || "",
        description_c: task.description_c || "",
        priority_c: task.priority_c || "medium",
        due_date_c: task.due_date_c || null,
        completed_c: task.completed_c || false,
        completed_at_c: task.completed_at_c || null,
        list_id_c: task.list_id_c?.Id || task.list_id_c || null,
        created_at_c: task.created_at_c || new Date().toISOString()
      }));
    } catch (error) {
      console.error("Error searching tasks:", error?.response?.data?.message || error);
      return [];
    }
  }
};