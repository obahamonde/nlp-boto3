import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import { createAuth0 } from "@auth0/auth0-vue";
import App from "./App.vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "uno.css";

import generatedRoutes from "virtual:generated-pages";
import { setupLayouts } from "virtual:generated-layouts";

const routes = setupLayouts(generatedRoutes);

createApp(App)
  .use(
    createAuth0({
      domain: "dev-tvhqmk7a.us.auth0.com",
      client_id: "53p0EBRRWxSYA3mSywbxhEeIlIexYWbs",
      redirect_uri: window.location.origin,
    })
  )
  .use(
    createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes,
    })
  )
  .use(createPinia())
  .use(
    createVuetify({
      components,
      directives,
    })
  )
  .mount("#app");
  