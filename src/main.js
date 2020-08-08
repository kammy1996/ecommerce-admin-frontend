import Vue from "vue";
import App from "./App";
import router from "../router/index";

new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App },
});
