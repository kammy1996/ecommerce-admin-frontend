import Sidebar from "../../../components/Sidebar";
// import { mapState } from "vuex";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "show_products",
  components: {
    Sidebar,
  },
  data() {
    return {
      page: 1,
      perPage: 4,
      products: [],
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
    async assignProducts() {
      await this.$store.dispatch("getProducts");
      this.products = await this.$store.getters.showProducts;
    },
  },
  created() {
    this.assignProducts();
  },
  computed: {
    ...mapGetters({
      categories: "showCategories",
    }),
    ...mapActions(["getCategories"]),
    visibleProducts() {
      return this.products.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
  },
};
