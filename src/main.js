import Vue from "vue";
import App from "./App";
import router from "../router/index";
import vuetify from "./plugins/vuetify";
import axios from "axios";

// ---Base URL for all the Request ---
axios.defaults.baseURL = "http://localhost:3000";

// ------------------------ Default Setup ----------
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  vuetify,
  axios,
});

// --------------------
