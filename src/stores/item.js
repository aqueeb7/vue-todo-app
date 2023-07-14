import { PiniaVuePlugin, defineStore } from "pinia";
import apiClient from "../services/api";
import { reactive, ref, onMounted } from "vue";

export const useItemStore = defineStore("item", () => {
  var items = reactive([])
  let itemId = ref("")

  const setTodoId = async (id) => {
    itemId = id
  }

  const addItem = async (data) => {
    try {
      const res = await apiClient.post(`/todos/${itemId}/items`, { "itemText": data });
      // no response data body has no contents
      // having diffculty in auto updating the list items
      await getAllItems(itemId)
    } catch (error) {
      console.error(error);
    }
  }

  const getAllItems = async (id) => {
    try {
      console.log({ store: id });
      const { data } = await apiClient.get(`/todos/${id}/items`)
      // items = data.content
      data.content.forEach((row) => {
        let index = items.findIndex((v) => {
          return v.itemId == row.itemId
        })
        if (index === -1) {
          items.push(row)
        }
      })
      console.log({ getAllItems: items });
    } catch (error) {
      console.log(error)
    }
  }

  return {
    items,
    addItem,
    setTodoId,
    getAllItems
  }
})