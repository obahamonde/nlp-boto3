<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { useState } from "~/store";
const { isAuthenticated, getAccessTokenSilently, loginWithRedirect, logout, handleRedirectCallback } = useAuth0();

const { state, setState } = useState();

const emit = defineEmits(["authenticated"]);


const login = async() => {
  await loginWithRedirect();
  await handleRedirectCallback().then(() => {
    emit("authenticated");
  });
};

const _ = async () => {
  try {
    const token = await getAccessTokenSilently();

    const { data } = await useFetch("https://smartpro.solutions/api/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).json();
    setState({ user: data.value, token: token });
  } catch (e) {
    console.error(e);
  }
};

const toggle = ref(false);

onMounted(async() => {
  if (isAuthenticated.value) {
    await _();
    emit("authenticated");
}})

watch(isAuthenticated, async (val) => {
  if (val) {
    await _();
  }
});
</script>
<template>
  <section @click="toggle = !toggle">
    <div v-if="isAuthenticated">
      <img :src="state.user.picture" br x4 fixed m-4 rf shadow-gray-500 shadow-md cp scale v-if="state.user" />
    </div>
    <Ico icon="mdi-login" @click="login()" br x2 fixed m-4 text-warning hover:text-danger cp scale v-else />
  </section>
  <v-card v-if="toggle" col center br fixed mr-24>
    <v-card-title text-body>{{ state.user.name }}</v-card-title>
    <v-card-subtitle text-mono>{{ state.user.email }}</v-card-subtitle>
    <button @click="logout()" class="btn-del">Logout</button>
  </v-card>
</template>
