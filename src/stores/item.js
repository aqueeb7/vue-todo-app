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
      console.log({ store: id });
      const { data } = await apiClient.get(`/todos/${id}/items`)
      // items = data.content
      data.content.forEach((row) => {
        console.log(row);
        if (items.filter(v => v.itemId != row.itemId)) {
          items.push(row)
        }
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