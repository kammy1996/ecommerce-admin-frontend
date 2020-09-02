import Sidebar from "../../../components/Sidebar";
// import axios from "axios";

export default {
  name: "show_products",
  components: {
    Sidebar,
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
  },
  computed: {
    addProducts() {
      return this.$store.dispatch("getProducts");
    },
    products() {
      return this.$store.getters.showProducts;
    },
  },
};
