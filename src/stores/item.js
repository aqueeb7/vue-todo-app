import { defineStore } from "pinia";
import apiClient from "../services/api";
import { reactive, ref, onMounted } from "vue";

export const useItemStore = defineStore("item", () => {
  const items = reactive([])
  var itemId = ref("")

  const setTodoId = async (id) => {
    itemId = id
  }

  const addItem = async (data) => {
    try {
      // await items.unshift(data);

      const res = await apiClient.post(`/todos/${itemId}/items`, { "itemText": data });
      // no response data body has no contents
      // having diffculty in auto updating the list items
    } catch (error) {
      console.error(error);
    }
  }

  const getAllItems = async (id) => {
    try {
      console.log({store: id});
      const { data } = await apiClient.get(`/todos/${id}/items`)
      data.content.forEach((row) => {
        items.push(row)
      })
      console.log({ getAllItems: items });
    } catch (error) {
      console.error(error);
    }
  }

  return {
    items,
    addItem,
    setTodoId,
    getAllItems
  }
})