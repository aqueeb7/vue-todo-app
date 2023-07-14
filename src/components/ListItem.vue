<script setup>
import { ref, onMounted } from "vue";
import { useItemStore } from "../stores/item";
import { Icon } from "@iconify/vue";

const itemStore = useItemStore();
const isListed = ref(true);
const itemText = ref("");
const item = ref({
  itemText: itemText,
});
const searchTerm = ref("");
const filteredData = ref([]);
const props = defineProps({
  itemId: String,
});
let id = ref();

onMounted(async () => {
  // console.log(props.itemId);
  id = props.itemId;
  await itemStore.getAllItems(id);
});

const addItem = async (e) => {
  // e.prevent.default();
  try {
    await itemStore.addItem(itemText.value);
    await itemStore.getAllItems(id.value);
    alert("Added successfully!");
    e.target.reset();
  } catch (error) {
    console.error(error);
  }
};

const filterData = async () => {
  /* filtering algorithm goes here */
  console.log({view: itemStore});
  console.log({view: searchTerm});
  const term = searchTerm.value.toLowerCase();
  filteredData.value = await itemStore.items.filter((item) => {
    console.log(item);
    return item.itemText.toLowerCase().includes(term);
  });
};

// console.log({aq: itemStore});
</script>

<template>
  <div class="columns">
    <div class="item-form column is-half is-centered m-5">
      <div class="card p-4">
        <p class="title is-4">Add some items...</p>
        <form @submit.prevent="addItem">
          <input
            v-model="itemText"
            class="input is-medium mb-2"
            type="text"
            placeholder="Enter Item"
          />
          <button>
            <Icon icon="material-symbols:add-box" width="20" />
          </button>
        </form>
      </div>
    </div>
    <div class="column m-5">
      <article class="panel is-info">
        <p class="panel-heading">Items List</p>

        <div class="panel-block">
          <p class="control has-icons-left">
            <input
              class="input is-info"
              v-model="searchTerm"
              @input="filterData"
              type="text"
              placeholder="Search"
            />
            <span class="icon is-left">
              <Icon icon="ic:baseline-search" width="20" color="black" />
            </span>
          </p>
        </div>
        <!-- <ul>
          <li v-for="item in filteredData">{{ item }}</li>
        </ul> -->

        {{ itemStore.items  }}
        <a class="panel-block" v-for="row in itemStore.items" :key="itemId">
          <p>{{ row.itemText }}</p>
        </a>
      </article>
    </div>
  </div>
</template>

<style scoped>
.item-form button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #03df5f;
  color: #fff;
  border: none;
  border-radius: 5px;
  width: 36px;
  height: 36px;
  box-shadow: 0 1px 3px rgb(165, 165, 165);
}
</style>
