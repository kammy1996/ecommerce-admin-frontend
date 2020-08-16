import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

//New Modules
import Dashboard from "../pages/dashboard";
import Product from "../pages/product/product";
import addProduct from "../pages/product/addProduct";
import ImageUpload from "../helpers/FileUpload";

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Product",
      component: Product,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/addProduct",
      name: "addProduct",
      component: addProduct,
    },
    {
      path: "/imageupload",
      name: "ImageUpload",
      component: ImageUpload,
    },
  ],
});
