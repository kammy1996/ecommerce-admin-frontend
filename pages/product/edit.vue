<template>
  <sidebar>
    <h3 slot="title">Edit Product</h3>
    <v-main slot="page">
      <v-form method="post" enctype="multipart/form-data">
        <v-row>
          <v-col cols="5">
            <v-carousel cycle show-arrows-on-hover>
              <v-carousel-item
                v-for="(image, index) in existing_images"
                :key="index"
              >
                <v-img :src="getImagePath(image)"></v-img>
              </v-carousel-item>
            </v-carousel>
            <v-spacer class="ma-10"></v-spacer>

            <v-card-title>Product Summary</v-card-title>
            <div class="summary-background">
              <v-card-text>
                Title:
                {{ product.name }}
              </v-card-text>
              <v-card-text>
                Short Description:
                {{ product.shortDescription }}</v-card-text
              >
              <v-card-text>
                Specification: {{ product.specification }}
              </v-card-text>

              <v-card-text> Category : {{ category.selectedCat }} </v-card-text>

              <v-card-title>Inventory</v-card-title>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">Color</th>
                    <th class="text-left">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(stock, index) in stock.existing_stock"
                    :key="index"
                  >
                    <td>{{ stock.color }}</td>
                    <td>{{ stock.quantity }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
              <v-spacer class="pt-5"></v-spacer>
              <v-card-title>Pricing</v-card-title>
              <v-card-text
                >Base Price (Incl.Taxes): {{ product.price }}</v-card-text
              >
              <v-card-text>Discount: {{ product.discount }}</v-card-text>
              <v-card-title
                >Final Amount: {{ product.finalPrice }}</v-card-title
              >
            </div>
          </v-col>

          <v-col cols="7">
            <v-card class="pa-5">
              <v-card-title>Product Details</v-card-title>
              <v-text-field
                name="name"
                label="Product Name"
                v-model="product.name"
                required
                disabled
              ></v-text-field>
              <v-textarea
                name="shortDescription"
                label="Short Description"
                v-model="product.shortDescription"
                rows="3"
                required
              ></v-textarea>
              <vue-editor
                v-model="product.specification"
                placeholder="Product Specification"
              />
              <v-spacer class="ma-5"></v-spacer>
              <v-row>
                <v-col cols="6">
                  <v-select
                    :items="category.categories"
                    item-text="name"
                    item-value="id"
                    v-model="category.catIndex"
                    label="Product Category"
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
                            v-model="category.categoryName"
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
                v-if="stock.colors.length > 0"
                :items="stock.colors"
                item-text="name"
                item-value="id"
                label="Current Stock"
                @change="editStock"
                v-model="stock.stockIndex"
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
                      v-model="stock.color"
                      label="Color"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      name="quantity"
                      label="Quantity"
                      v-model="stock.quantity"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <input
                      v-if="stock.stockIndex != null"
                      type="file"
                      ref="files"
                      @change="selectedFile"
                      multiple
                    />
                  </v-col>

                  <v-row>
                    <v-col cols="5">
                      <v-btn
                        v-if="stock.stockIndex != null"
                        color="primary"
                        class="ml-5"
                        @click="updateStock"
                        ><v-icon>mdi-check</v-icon>Save Color</v-btn
                      ></v-col
                    >
                    <v-col cols="5">
                      <v-btn
                        v-if="stock.stockIndex != null"
                        color="primary"
                        class="ml-5"
                        @click="deleteStockDialog = true"
                        ><v-icon>mdi-trash-can</v-icon>Delete Color</v-btn
                      >

                      <v-dialog
                        v-model="deleteStockDialog"
                        persistent
                        max-width="290"
                      >
                        <v-card>
                          <v-card-title class="headline grey lighten-2">
                            Please Note
                          </v-card-title>

                          <v-card-text>
                            <br />
                            Deleting a Stock color with result in Permanent loss
                            of Images associate with it
                          </v-card-text>

                          <v-card-actions>
                            <v-btn color="blue" text @click="deleteStock"
                              >Continue</v-btn
                            >
                            <v-btn
                              color="blue"
                              text
                              @click="deleteStockDialog = false"
                              >Close</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="5">
                      <v-dialog
                        v-model="imagesDialog"
                        persistent
                        max-width="600px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn color="primary" dark v-bind="attrs" v-on="on">
                            <v-icon> mdi-upload </v-icon> View Images
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="headline">Your Images</span>
                          </v-card-title>
                          <v-row>
                            <v-col
                              cols="4 "
                              v-for="(image, index) in existing_images"
                              :key="index"
                            >
                              <v-img :src="getImagePath(image)"></v-img>

                              <v-btn @click="removeImage(index)">X</v-btn>
                            </v-col>
                          </v-row>

                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="imagesDialog = false"
                            >Close</v-btn
                          >
                        </v-card>
                      </v-dialog>
                    </v-col>
                    <v-col cols="5">
                      <v-btn
                        color="primary"
                        class="ml-5"
                        @click="addNewStock"
                        v-if="stock.stockIndex === null"
                        ><v-icon>mdi-plus</v-icon>Add Color</v-btn
                      >
                    </v-col>
                  </v-row>
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
                    v-model="product.price"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    name="discount"
                    label="₹ Discount Price"
                    @change="calcFinalPrice"
                    v-model="product.discount"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-title
                >Total Amount Payable : {{ product.finalPrice }}
              </v-card-title>
            </v-card>
            <v-spacer class="ma-10"></v-spacer>
            <v-btn
              @click.prevent="updateData"
              type="submit"
              color="success"
              large
              ><v-icon>mdi-check</v-icon>&nbsp; SAVE CHANGES</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-main>
  </sidebar>
</template>

<script>
import edit from "../../modules/product/models/edit";

export default edit;
</script>

<style>
.summary-background {
  background: rgba(5, 4, 4, 0.05);
  padding: 20px;
}
</style>
