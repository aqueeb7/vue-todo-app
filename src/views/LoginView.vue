<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();

const username = ref("");
const password = ref("");

const ulogin = async () => {
  try {
    await authStore.login({
      email: username.value,
      password: password.value,
    });
    router.push("/todo");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="container">
    <section class="section is-large">
      <div class="columns is-centered is-flex">
        <div class="column is-half">
          <form
            class="box is-justify-content-center is-align-items-center"
            @submit.prevent="ulogin"
          >
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  class="input"
                  v-model="username"
                  type="email"
                  placeholder="e.g. bob@bob.com"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input class="input" v-model="password" type="password" placeholder="H3llo" />
              </div>
            </div>

            <button class="button is-primary">Log In</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
