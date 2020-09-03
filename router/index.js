import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

//New Modules
import Dashboard from "../pages/dashboard";
import All from "../pages/product/all";
import Details from "../pages/product/details";
import Edit from "../pages/product/edit";

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "show_products",
      component: All,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/add",
      name: "add_product",
      component: Details,
    },
    {
      path:"/product/:id/details",
      name:"edit_products",
      component : Edit
    }

  ],
});
