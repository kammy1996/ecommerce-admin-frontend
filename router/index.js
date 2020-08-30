import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

//New Modules
import Dashboard from "../pages/dashboard";
import All from "../pages/product/all";
import Details from "../pages/product/details";
import ImageUpload from "../helpers/FileUpload";

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "All",
      component: All,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/details",
      name: "Details",
      component: Details,
    },
    {
      path: "/imageupload",
      name: "ImageUpload",
      component: ImageUpload,
    },
  ],
});
