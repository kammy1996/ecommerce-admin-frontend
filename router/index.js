import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

//New Modules
import Dashboard from "../pages/dashboard";
import All from "../pages/product/all";
import Add from "../pages/product/add";
import Edit from "../pages/product/edit";

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/",
      name: "show_products",
      component: All,
    },
   
    {
      path: "/product/add",
      name: "add_product",
      component: Add,
    },
    {
      path:"/product/edit/:id",
      name:"edit_products",
      component : Edit
    }

  ],
});
