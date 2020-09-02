import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

//New Modules
import Dashboard from "../pages/dashboard";
import All from "../pages/product/all";
import Details from "../pages/product/details";

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
      path: "/product/:id/details",
      name: "product_details",
      component: Details,
    },
  ],
});
