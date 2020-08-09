import Vue from "vue";
import App from "./App";
import router from "../router/index";
import vuetify from "../plugins/vuetify";

new Vue({
  el: "#app",
  router,
  template: "<App/>",
  vuetify,
  components: { App }
});
