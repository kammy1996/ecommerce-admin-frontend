// import { mapGetters } from "vuex";
import Sidebar from "../../../components/Sidebar";
import { VueEditor } from "vue2-editor";
import axios from "axios";
// import { mapActions } from "vuex";

export default {
  name: "edit_product",
  components: {
    VueEditor,
    Sidebar,
  },
  data() {
    return {
      currentProduct: null,
      product: {
        name: "",
        shortDescription: "",
        specification: "",
        price: null,
        discount: null,
        finalPrice: null,
      },
      stock: {
        colors: [],
        color: null,
        quantity: null,
        existing_stock: [],
        stockIndex: null,
      },
      category: {
        categoryName: "",
        catIndex: null,
        categories: null,
        selectedCat: null,
      },
      files: [],
      existing_images: [],
      uploadFiles: [],
      removedImages: [],
      imagesDialog: false,
      dialog: false,
      deleteStockDialog: false,
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      const res = await axios
        .get(`/product/${this.$route.params.id}`)
        .catch((err) => console.log(err));
      this.currentProduct = res.data;

      let product = this.currentProduct[0];
      this.product.name = product.name;
      this.product.shortDescription = product.short_description;
      this.product.specification = product.specification;
      this.product.price = product.price;
      this.product.discount = product.discount;
      this.product.finalPrice = product.final_price;
      this.category.catIndex = product.category_id;

      const fetchedStock = await axios
        .get(`product/fetch/stock/${this.$route.params.id}`)
        .catch((err) => console.log(err));
      this.stock.existing_stock = fetchedStock.data;

      const fetchedImages = await axios
        .get(`/product/fetch/image/${this.$route.params.id}`)
        .catch((err) => console.log(err));
      this.existing_images = fetchedImages.data;

      this.stock.existing_stock.forEach((color) => {
        this.stock.colors.push(color.color);
      });

      await this.$store.dispatch("getCategories");
      this.category.categories = this.$store.getters.showCategories;

      this.category.categories.forEach((category) => {
        if (category.id == this.category.catIndex) {
          this.category.selectedCat = category.name;
        }
      });
    },
    async updateData() {
      let stockSubmit = [];
      this.stock.existing_stock.forEach((stock) => {
        stockSubmit.push([stock.color, stock.quantity, stock.id]);
      });

      const updateForm = {
        shortDescription: this.product.shortDescription,
        specification: this.product.specification,
        price: parseInt(this.product.price),
        discount: parseInt(this.product.discount),
        finalPrice: parseInt(this.product.finalPrice),
        stock: stockSubmit,
        categoryId: this.category.catIndex,
      };

      await axios
        .put(`/product/update/${this.$route.params.id}`, updateForm)
        .then((res) => console.log(res.data.message))
        .catch((err) => console.log(err));

      //update existing images
      if (this.removedImages.length > 0) {
        let removedFiles = [];
        this.removedImages.forEach((remove) => {
          removedFiles.push(remove.file_name);
        });

        console.log(removedFiles);

        let imagesData = {
          removed: removedFiles,
          pName: this.product.name,
        };

       await axios
          .put(`/product/update/existing/image`, imagesData)
          .then((res) => console.log(res.data.message))
          .catch((err) => console.log(err));
      }

      // If Upload new Images while editing
      if (this.uploadFiles.length > 0) {
        let fd = new FormData();
        this.uploadFiles.forEach((file) => {
          fd.append("files", file);
        });

        //Assigning the new images to the First Stock Always
        fd.append("name", this.product.name);

        let colorIndex = this.stock.colors.indexOf(this.stock.stockIndex);
        console.log(colorIndex);
        let newImageStockId;
        if (this.stock.stockIndex == null) {
          newImageStockId = this.stock.existing_stock[0].id;
        } else if (
          this.stock.stockIndex == this.stock.existing_stock[colorIndex].color
        ) {
          newImageStockId = this.stock.existing_stock[colorIndex].id;
        }
       await axios
          .post(`/product/update/image/new/${newImageStockId}`, fd)
          .then((res) => console.log(res.data.message))
          .catch((err) => console.log(err));
      }
        
      this.$router.go();
    },

    editStock() {
      this.stock.color = this.stock.stockIndex;
      var colorIndex = this.stock.colors.indexOf(this.stock.stockIndex);

      if (
        this.stock.stockIndex == this.stock.existing_stock[colorIndex].color
      ) {
        this.stock.quantity = this.stock.existing_stock[colorIndex].quantity;
      }
    },
    getImagePath(image) {
      return (
        process.env.VUE_APP_HOST_URL +
        "/" +
        this.product.name +
        "/" +
        image.file_name
      );
    },
    calcFinalPrice() {
      this.product.finalPrice = this.product.price - this.product.discount;
    },
    removeImage(index) {
      this.removedImages.push(this.existing_images[index]);
      this.existing_images.splice(index, 1);
    },
    updateStock() {
      var colorIndex = this.stock.colors.indexOf(this.stock.stockIndex);
      this.stock.colors.splice(colorIndex, 1, this.stock.color);

      this.stock.existing_stock[colorIndex].color = this.stock.color;
      this.stock.existing_stock[colorIndex].quantity = this.stock.quantity;
    },
    async addNewStock() {
      if ((this.stock.color == null) & (this.stock.quantity == null)) {
        return console.log(`no Color Entered`);
      }
      
      let newStock = {
        color: this.stock.color,
        quantity: this.stock.quantity,
      };

      axios
        .post(`/product/update/add/stock/${this.$route.params.id}`, newStock)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      this.$router.go();
    },
    async deleteStock() {
      let colorIndex = this.stock.colors.indexOf(this.stock.stockIndex);
      let deletedStock;
      if (this.stock.stockIndex == null) {
        return console.log(`no stock Selected`);
      } else {
        deletedStock = this.stock.existing_stock[colorIndex].id;
      }

      let nameOfProduct = {
        name: this.product.name,
      };

      axios
        .put(`product/update/delete/stock/${deletedStock}`, nameOfProduct)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      this.deleteStockDialog = false;
      this.$router.go();
    },

    selectedFile() {
      const files = this.$refs.files.files;
      this.uploadFiles = [...this.uploadFiles, ...files];
    },
    async addCategory() {
        let self = this 
        let payload = {
            catName: self.category.categoryName,
          };
          this.$store.dispatch("ADD_NEW_CATEGORY", payload);
    },
  },
};