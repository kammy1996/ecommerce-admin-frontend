<template>
  <sidebar>
    <h3 slot="title">Add New Product</h3>
    <v-main slot="page">
      <v-form>
        <v-row>
          <v-col cols="5">
            <v-carousel cycle show-arrows-on-hover>
              <v-carousel-item>
                <v-img
                  src="../../assets/images/product/bike-product.png"
                ></v-img>
              </v-carousel-item>
              <v-carousel-item>
                <v-img src="../../assets/images/product/bike-2.jpg"></v-img>
              </v-carousel-item>
              <v-carousel-item>
                <v-img
                  src="../../assets/images/product/product-default.jpg"
                ></v-img>
              </v-carousel-item>
            </v-carousel>
            <v-spacer class="ma-10"></v-spacer>
            <v-card-title>Product Summary</v-card-title>
            <div class="summary-background">
              <v-card-text> Title: </v-card-text>
              <v-card-text> Short Description: </v-card-text>
              <v-card-text> Specification: </v-card-text>
              <v-card-text>Category:</v-card-text>

              <v-card-title>Inventory</v-card-title>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">Sr.no</th>
                    <th class="text-left">Color</th>
                    <th class="text-left">Quantity</th>
                    <th class="text-left">No.images</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Red</td>
                    <td>10</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Red</td>
                    <td>10</td>
                    <td>3</td>
                  </tr>
                </tbody>
              </v-simple-table>
              <v-spacer class="pt-5"></v-spacer>
              <v-card-title>Pricing</v-card-title>
              <v-card-text>Base Price (Incl.Taxes): </v-card-text>
              <v-card-text>Discount: </v-card-text>
              <v-card-title>Final Amount: </v-card-title>
            </div>
          </v-col>
          <v-col cols="7">
            <v-card class="pa-5">
              <v-card-title>Product Details</v-card-title>
              <v-text-field
                name="productName"
                label="Product Name"
                required
              ></v-text-field>
              <v-textarea
                name="shortDescription"
                label="Short Description"
                rows="3"
              ></v-textarea>
              <vue-editor placeholder="Product Specification" />
              <v-spacer class="ma-5"></v-spacer>
              <v-row>
                <v-col cols="6">
                  <v-select label="Product Category" multiple></v-select>
                </v-col>
                <v-col cols="2">
                  <v-btn color="primary" small
                    ><v-icon>mdi-plus</v-icon> Category</v-btn
                  >
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
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    name="color"
                    label="Color"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    name="quantity"
                    label="Quantity"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-btn color="primary" small class="ml-5"
                    ><v-icon>mdi-plus</v-icon>Images</v-btn
                  >
                </v-col>
                <v-col cols="3">
                  <v-btn color="primary" small class="ml-5"
                    ><v-icon>mdi-plus</v-icon>Color</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
            <v-spacer class="ma-10"></v-spacer>
            <v-card class="pa-10">
              <v-card-title>Product Price</v-card-title>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    name="color"
                    label="₹ Base Price (Incl.Taxes)"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    name="color"
                    label="₹ Discount Price"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-title>Total Amount Payable : 500</v-card-title>
            </v-card>
            <v-spacer class="ma-10"></v-spacer>
            <v-btn color="success" large
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

export default {
  components: {
    VueEditor,
    Sidebar,
  },
};
</script>

<style>
.summary-background {
  background: rgba(0, 0, 0, 0.05);
  padding: 20px;
}
</style>
