//Default Modules
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

//New Modules
import HelloWorld from "../components/HelloWorld";

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    }
  ]
});
