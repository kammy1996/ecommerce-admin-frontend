import Sidebar from "../../../components/Sidebar";
import axios from "axios";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      products: null,
    };
  },
  computed: {
    counter() {
      return this.$store.state.counter;
    },
  },
  methods: {
    getImagePath(product) {
      return "http://localhost:3000/" + product.name + "/" + product.file_name;
    },

    incrementCounter() {
      this.$store.commit("increment");
    },
  },

  mounted() {
    axios
      .get("product/show")
      .then((res) => (this.products = res.data))
      .catch((error) => console.log(error));
  },
};