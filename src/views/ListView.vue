<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ListItem from '../components/ListItem.vue';
import { useItemStore } from "../stores/item";




const route = useRoute()
const todoId = route.params.id;
const itemStore = useItemStore();

onMounted( async () => {
  await itemStore.setTodoId(todoId);
})
</script>

<template>
  <div class="container">
  <ListItem :itemId="todoId" />
</div>
</template>