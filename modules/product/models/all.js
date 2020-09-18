import Sidebar from "../../../components/Sidebar";
import axios from "axios"

import { mapGetters } from "vuex";

export default {
  name: "show_products",
  components: {
    Sidebar,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 4,
      totalProducts: [],
      visibleProducts :[],
      overlay : false
    };
  },
  methods: {
    getImagePath(product) {
      return (
        process.env.VUE_APP_HOST_URL +
        "/" +
        product.name +
        "/" +
        product.file_name
      );
    },
    fetchProductAsPerId(product) {
      return process.env.VUE_APP_HOST_URL + "/" + product.id;
    },
    async getData() {
      await this.$store.dispatch("getProducts");
      this.totalProducts = await this.$store.getters.showProducts;

      const res = await axios.get(`/product/show/${this.perPage}/${this.currentPage}`)
      .catch ((err) => console.log(err))
      this.visibleProducts = res.data

      await this.$store.dispatch('getCategories');

    },
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapGetters({
      categories: "showCategories",
    }),
  
  },
  watch : { 
    async currentPage () { 
      this.overlay = true
      const res = await axios.get(`/product/show/${this.perPage}/${this.currentPage}`)
      .catch((err) => console.log(err))
      this.visibleProducts = res.data

      setTimeout(() => {
        this.overlay = false;
      }, 1000);
    }
  }
};
