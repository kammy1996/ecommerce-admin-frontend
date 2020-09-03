import Sidebar from "../../../components/Sidebar";
import { VueEditor } from "vue2-editor";
import axios from "axios";

export default {
  name: "product_details",
  components: {
    VueEditor,
    Sidebar,
  },
  data() {
    return {
      //Submission variables
      name: "",
      shortDescription: "",
      specification: "",
      price: null,
      discount: null,
      finalPrice: null,
      catIndex: "",
      stock: [],
      uploadFiles: [],
      //Variables to show in frontend
      addedStocks: [],
      categories: null,
      showStocks: [],
      url: [],
      //Other variables
      dialog: false,
      files: [],
      categoryName: "",
      color: "",
      quantity: null,
 
    };
  },

  methods: {
    submitData() {
      let submissionData = {
        name: this.name,
        shortDescription: this.shortDescription,
        specification: this.specification,
        price: parseInt(this.price),
        discount: parseInt(this.discount),
        finalPrice: parseInt(this.finalPrice),
        selectedCat: parseInt(this.catIndex),
      };
      axios
        .post("product/add", submissionData)
        .then((res) => (this.message = res.data.message))
        .catch((error) => console.log(error));
    },

    calcFinalPrice() {
      this.finalPrice = this.price - this.discount;
    },
    addCategory() {
      let categoryData = {
        catName: this.categoryName,
      };
      //adding the category
      axios
        .post("product/category/add", categoryData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      //showing the cateogyr
    },
    selectedFile(e) {
      const files = this.$refs.files.files;
      this.uploadFiles = [...this.uploadFiles, ...files];

      //Preview Images in the form
      this.url = [];
      let fileList = Array.prototype.slice.call(e.target.files);
      fileList.forEach((f) => {
        if (!f.type.match("image.*")) {
          return;
        }
        let reader = new FileReader();
        let that = this;

        reader.onload = function(e) {
          that.url.push(e.target.result);
        };
        reader.readAsDataURL(f);
      });

      console.log(this.url);
    },

    addStock() {
      //Showing the data in the inventory management for later edits
      if (this.color != "") {
        this.showStocks.push(this.color);
      }

      // Showing it in Summary
      this.addedStocks.push({
        color: this.color,
        quantity: this.quantity,
        noOfImages: this.url.length,
      });

      //Sending the data
      this.stock.push([this.color, this.quantity]);

      let stockData = {
        stock: this.stock,
      };

      axios
        .post("product/stock/add", stockData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      const formData = new FormData();
      this.uploadFiles.forEach((file) => {
        formData.append("files", file);
      });

      formData.append(`nameForImage`, this.name);

      axios
        .post("product/image/add", formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      this.files = []; // clearing the Image input form
      this.stock = []; // clearing the stock after saving color
      this.color = ""; //
      this.quantity = "";
      this.uploadFiles = [];
    },
  },

  mounted() {
    axios
      .get("product/category/show")
      .then((res) => {
        this.categories = res.data;
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
  },
};
