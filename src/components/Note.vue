<script setup>
import { useNoteStore } from "../stores/note";
import { onMounted } from "vue";
import { Icon } from "@iconify/vue";
import Item from "./ListItem.vue";
import router from "../router";
const noteStore = useNoteStore();

onMounted(async () => {
  await noteStore.getAllNotes();
});

const toggleTask = async (id) => {
  let data = {
    done: true,
  };
  await noteStore.updateNote(id, data);
};
</script>

<template>
  <div class="note" v-for="row in noteStore.notes" :key="noteStore.todoId">
    <input
      type="checkbox"
      @change="toggleTask(row.todoId)"
      v-model="row.done"
    />
    {{ row.todoId }}
    <h1>{{ row.title }}</h1>
    <p>{{ row.description }}</p>
    <!-- <Item /> -->
    <button><Icon icon="material-symbols:delete" width="25" /></button>
    <button @click="router.push(`/item/${row.todoId}`)">
      <Icon icon="ic:round-remove-red-eye" color="F4D160" width="25" />
    </button>
  </div>
</template>
<style scoped>
.note {
  background: #fff;
  width: 270px;
  border-radius: 7px;
  box-shadow: 0 2px 5px rgb(175, 175, 175);
  padding: 10px;
  margin: 16px;
  float: left;
}
.note:hover {
  scale: 1.01;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1) ease-in-out;
}

.note h1 {
  font-size: 1rem;
  margin-bottom: 6px;
}

.note p {
  font-style: 1rem;
  margin-bottom: 10px;
  word-spacing: pre-wrap;
  word-wrap: break-word;
}

.note button {
  position: relative;
  float: right;
  color: #fd4444;
  background: none;
  cursor: pointer;
  border: none;
  outline: none;
}
</style>
