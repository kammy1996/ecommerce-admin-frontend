<template>
  <sidebar>
    <h3 slot="title">Add New Product</h3>
    <v-main slot="page">
      <v-form method="post" enctype="multipart/form-data">
        <v-row>
          <v-col cols="5">
            <v-carousel cycle show-arrows-on-hover>
              <v-carousel-item v-for="(item, index) in url" :key="index">
                <v-img :src="item"></v-img>
              </v-carousel-item>
            </v-carousel>
            <v-spacer class="ma-10"></v-spacer>
            <v-card-title>Product Summary</v-card-title>
            <div class="summary-background">
              <v-card-text>
                Title:
                {{ name }}
              </v-card-text>
              <v-card-text>
                Short Description:
                {{ shortDescription }}</v-card-text
              >
              <v-card-text> Specification: {{ specification }} </v-card-text>

              <v-card-title>Inventory</v-card-title>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">Color</th>
                    <th class="text-left">Quantity</th>
                    <th class="text-left">No.images</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(stock, index) in addedStocks" :key="index">
                    <td>{{ stock.color }}</td>
                    <td>{{ stock.quantity }}</td>
                    <td>{{ stock.noOfImages }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
              <v-spacer class="pt-5"></v-spacer>
              <v-card-title>Pricing</v-card-title>
              <v-card-text>Base Price (Incl.Taxes): {{ price }}</v-card-text>
              <v-card-text>Discount: {{ discount }}</v-card-text>
              <v-card-title>Final Amount: {{ finalPrice }}</v-card-title>
            </div>
          </v-col>

          <v-col cols="7">
            <v-card class="pa-5">
              <v-card-title>Product Details</v-card-title>
              <v-text-field
                name="name"
                label="Product Name"
                v-model="name"
                required
              ></v-text-field>
              <v-textarea
                name="shortDescription"
                label="Short Description"
                v-model="shortDescription"
                rows="3"
                required
              ></v-textarea>
              <vue-editor
                v-model="specification"
                placeholder="Product Specification"
              />
              <v-spacer class="ma-5"></v-spacer>
              <v-row>
                <v-col cols="6">
                  <v-select
                    :items="categories"
                    item-text="name"
                    item-value="id"
                    v-model="catIndex"
                    label="Product Category"
                    multiple
                  ></v-select>
                </v-col>
                <v-col cols="2">
                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        small
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon> mdi-plus </v-icon> Category
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Add New Category</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-text-field
                            label="New Category Name *"
                            required
                            prepend-icon="mdi-order-bool-descending"
                            v-model="categoryName"
                          ></v-text-field>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog = false"
                          >Close</v-btn
                        >
                        <v-btn color="blue darken-1" text @click="addCategory"
                          >Save</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
                <v-col cols="3">
                  <v-btn color="primary" small class="ml-5"
                    ><v-icon>mdi-update</v-icon>&nbsp; update Category</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
            <v-spacer class="ma-10"></v-spacer>
            <v-card class="pa-10">
              <v-card-title>Inventory Management</v-card-title>
              <v-select
                v-if="showStocks.length > 0"
                :items="showStocks"
                item-text="name"
                item-value="id"
                label="Current Stock"
              ></v-select>
              <v-form
                method="post"
                @submit.prevent="addStock"
                enctype="multipart/form-data"
              >
                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      name="color"
                      v-model="color"
                      label="Color"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      name="quantity"
                      v-model="quantity"
                      label="Quantity"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <input
                      type="file"
                      ref="files"
                      @change="selectedFile"
                      multiple
                    />
                    <v-divider class="mt-5"></v-divider>
                  </v-col>
                  <v-btn color="primary" class="ml-5" type="submit"
                    ><v-icon>mdi-check</v-icon>Save Color</v-btn
                  >
                </v-row>
              </v-form>
            </v-card>
            <v-spacer class="ma-10"></v-spacer>
            <v-card class="pa-10">
              <v-card-title>Product Price</v-card-title>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    name="price"
                    label="₹ Base Price (Incl.Taxes)"
                    v-model="price"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    name="discount"
                    label="₹ Discount Price"
                    v-model="discount"
                    @keyup="calcFinalPrice"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-card-title
                >Total Amount Payable : {{ finalPrice }}
              </v-card-title>
            </v-card>
            <v-spacer class="ma-10"></v-spacer>
            <v-btn
              @click.prevent="submitData"
              type="submit"
              color="success"
              large
              ><v-icon>mdi-check</v-icon>&nbsp; SAVE</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-main>
  </sidebar>
</template>

<script>
import Sidebar from "../../components/Sidebar";
import { VueEditor } from "vue2-editor";
import axios from "axios";

export default {
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
</script>

<style>
.summary-background {
  background: rgba(0, 0, 0, 0.05);
  padding: 20px;
}
</style>
