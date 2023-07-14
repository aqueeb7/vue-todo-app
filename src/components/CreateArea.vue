<script setup>
import { ref, reactive } from "vue";
import { useNoteStore } from "../stores/note";
import { useItemStore } from "../stores/item";
import { Icon } from "@iconify/vue";

const noteStore = useNoteStore();
const itemStore = useItemStore();
// console.log(itemStore);

const title = ref("");
const description = ref("");
const labelColour = ref("WHITE");
const done = ref(false);
const itemText = ref("");

const item = ref({
  itemText: itemText,
});

const note = reactive({
  title: title,
  description: description,
  done: done,
  labelColour: labelColour,
});

const isExpanded = ref(false);
const isListed = ref(false);

const submitButton = async (e) => {
  e.prevent.default()
  try {
    await noteStore.addNote(note);
    e.target.reset();
  } catch (error) {}
};
async function addItem(e) {
e.prevent.default();
try {
await itemStore.addItem(item);
e.target.reset();
} catch (error) {
console.error(error);
}
}
</script>

<template>
  <div class="custom-main">
    <div>
      <form class="note-form">
        <input
          type="text"
          v-if="isExpanded"
          v-model="title"
          placeholder="Title"
          name="title"
        />
        <p>
          <textarea
            @click="isExpanded = true"
            v-model="description"
            name="descriptions"
            placeholder="Take a note..."
            rows="{{isExpanded?3:1}}"
          >
          </textarea>
         
        </p>
        <!-- <div class="item-form" v-if="isListed">
            <ul id="item-container">
              <li>
                <input
                  v-model="itemText"
                  class="item-input"
                  type="text"
                  placeholder="Enter Item"
                />
              </li>
              <button @click="addItem"><Icon icon="material-symbols:add-box" width="20"/></button>
            </ul>
        </div> -->
        <button class="list-btn">
          <Icon icon="material-symbols:save" width="25" @click="submitButton" />
        </button>
      </form>
    </div>

    <!-- <button @click="isListed = !isListed" class="todo-btn">
      <Icon
        icon="material-symbols:format-list-bulleted-add-rounded"
        width="25"
      />
    </button> -->
  </div>
</template>

<style scoped>
.custom-main {
  position: relative;
  width: 600px;
  margin: 32px auto 50px auto;
  background: #fff;
  padding: 7px;
  border-radius: 7px;
  box-shadow: 0 1px 7px rgb(128, 128, 128);
}

.note-form input {
  width: 100%;
  border: none;
  padding: 4px 10px;
  margin-bottom: 20px;
  outline: none;
  font-size: 1rem;
  resize: none;
}
.item-form .item-title {
  width: 100%;
  border: none;
  padding: 4px 10px;
  margin-bottom: 20px;
  outline: none;
  font-size: 1rem;
  resize: none;
}

.item-input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px 10px 10px;
  margin-bottom: 20px;
}

.note-form textarea {
  width: 100%;
  border: none;
  padding: 4px 10px;
  margin-bottom: 20px;
  outline: none;
  font-size: 1rem;
  resize: none;
}

.custom-main .todo-btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 80px;
  bottom: -18px;
  background: #fa6900;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  box-shadow: 0 1px 3px rgb(165, 165, 165);
}
.custom-main .list-btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 120px;
  bottom: -18px;
  background: #005bc5;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  box-shadow: 0 1px 3px rgb(165, 165, 165);
}
.item-form button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #09f7db;
  color: #fff;
  border: none;
  border-radius: 5px;
  width: 36px;
  height: 36px;
  box-shadow: 0 1px 3px rgb(165, 165, 165);
}
</style>
