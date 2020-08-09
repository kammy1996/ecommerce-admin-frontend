import Vue from "vue";
import App from "./App";
import router from "../router/index";
import vuetify from "./plugins/vuetify";

// ------------------------ Default Setup ----------
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  vuetify,
});

// --------------------
