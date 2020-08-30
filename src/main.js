import Vue from "vue";
import App from "./App";
import router from "../router/index";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { store } from "../store/store";

// ---Base URL for all the Request ---
axios.defaults.baseURL = "http://localhost:3000/api";

// ------------------------ Default Setup ----------
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  store,
  vuetify,
  axios,
});

// --------------------
