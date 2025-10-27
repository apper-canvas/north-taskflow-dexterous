import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";
import { taskService } from "./taskService.js";
import React from "react";

export const listService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      
      const allTasks = await taskService.getAll();
      
      const params = {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 1000, "offset": 0}
      };
      
      const response = await apperClient.fetchRecords('list_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      if (!response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data.map(list => ({
        Id: list.Id,
        name_c: list.name_c || "",
        color_c: list.color_c || "#3b82f6",
        created_at_c: list.created_at_c || new Date().toISOString(),
        task_count_c: allTasks.filter(task => task.list_id_c === list.Id).length
      }));
    } catch (error) {
      console.error("Error fetching lists:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "created_at_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById('list_c', id, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      if (!response.data) {
        return null;
      }
      
      const tasks = await taskService.getByListId(id);
      
      return {
        Id: response.data.Id,
        name_c: response.data.name_c || "",
        color_c: response.data.color_c || "#3b82f6",
        created_at_c: response.data.created_at_c || new Date().toISOString(),
        task_count_c: tasks.length
      };
    } catch (error) {
      console.error(`Error fetching list ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(listData) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [{
          name_c: listData.name_c || listData.name || "",
          color_c: listData.color_c || listData.color || "#3b82f6",
          created_at_c: new Date().toISOString()
        }]
      };
      
      const response = await apperClient.createRecord('list_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} lists:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          const created = successful[0].data;
          return {
            Id: created.Id,
            name_c: created.name_c || "",
            color_c: created.color_c || "#3b82f6",
            created_at_c: created.created_at_c || new Date().toISOString(),
            task_count_c: 0
          };
        }
      }
      return null;
    } catch (error) {
      console.error("Error creating list:", error?.response?.data?.message || error);
      return null;
    }
  },

  async update(id, updates) {
    try {
      const apperClient = getApperClient();
      
      const updateData = {
        Id: parseInt(id)
      };
      
      if (updates.name_c !== undefined) updateData.name_c = updates.name_c;
      if (updates.name !== undefined) updateData.name_c = updates.name;
      if (updates.color_c !== undefined) updateData.color_c = updates.color_c;
      if (updates.color !== undefined) updateData.color_c = updates.color;
      
      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord('list_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} lists:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          const updated = successful[0].data;
          const tasks = await taskService.getByListId(id);
          
          return {
            Id: updated.Id,
            name_c: updated.name_c || "",
            color_c: updated.color_c || "#3b82f6",
            created_at_c: updated.created_at_c || new Date().toISOString(),
            task_count_c: tasks.length
          };
        }
      }
      return null;
    } catch (error) {
      console.error("Error updating list:", error?.response?.data?.message || error);
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord('list_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} lists:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0;
      }
      return false;
    } catch (error) {
      console.error("Error deleting list:", error?.response?.data?.message || error);
return false;
    }
  }
};