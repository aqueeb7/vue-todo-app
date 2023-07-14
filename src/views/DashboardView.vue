<script setup>
import { reactive } from "vue";
import CreateArea from "../components/CreateArea.vue"
import Note from "../components/Note.vue"
const notes = reactive([])
</script>

<template>
  <CreateArea />
  <Note/>
</template>
