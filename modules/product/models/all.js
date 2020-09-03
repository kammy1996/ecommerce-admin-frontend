import Sidebar from "../../../components/Sidebar";
// import { mapState } from "vuex";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

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
    ...mapGetters({
      products: "showProducts",
    }),
    ...mapActions(["getProducts"]),
    // ...mapActions(["getProducts"]),
  },
};
