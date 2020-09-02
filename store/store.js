import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    products: null,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
  },
  actions: {
    async getProducts({ commit }) {
      const res = await axios
        .get("product/show")
        .catch((err) => console.log(err));
      commit("setProducts", res.data);
    },
  },
  getters: {
    showProducts(state) {
      return state.products;
    },
  },
});
