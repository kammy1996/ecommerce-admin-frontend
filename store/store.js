import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    products: [],
    existing_categories: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setCategories(state, categories) {
      state.existing_categories = categories;
    },
  },
  actions: {
    async getProducts({ commit }) {
      const res = await axios
        .get("product/show")
        .catch((err) => console.log(err));
      commit("setProducts", res.data);
    },
    async getCategories({ commit }) {
      const res = await axios
        .get(`product/category/show`)
        .catch((err) => console.log(err));
      commit("setCategories", res.data);
    },
    async ADD_NEW_CATEGORY(context, payload) {
      await axios
        .post(`product/category/add`, payload)
        .catch((err) => console.log(err))
        .then((res) => console.log(res));
    },
  },
  getters: {
    showProducts(state) {
      return state.products;
    },
    showCategories(state) {
      return state.existing_categories;
    },
  },
});
