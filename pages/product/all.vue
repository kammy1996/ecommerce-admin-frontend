<template>
  <sidebar>
    <h3 slot="title">Products</h3>
    <v-main slot="page">
      <v-container>
        <v-row>
          <v-col cols="10">
            <v-text-field
              append-icon="mdi-magnify"
              label="Search products By Name"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <div class="my-2">
              <a href="/add">
                <v-btn color="primary"
                  ><v-icon>mdi-plus</v-icon> New Product
                </v-btn></a
              >
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3" v-for="(product, index) in products" :key="index">
            <v-card class="mx-auto per-product" max-width="400">
              <v-img
                class="white--text align-end product-image"
                :src="getImagePath(product)"
              >
              </v-img>
              <v-divider></v-divider>
              <a :href="'/product/' + product.id + '/details'"
                ><v-card-title>{{ product.name }}</v-card-title></a
              >
              <v-card-subtitle class="pb-1">Bikes</v-card-subtitle>

              <v-card-title>
                &#8377; {{ product.final_price }}
                <v-chip class="ma-2" color="red" text-color="white"
                  >{{ product.discount }} Off</v-chip
                >
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </sidebar>
</template>

<script>
import all from "../../modules/product/models/all";

export default all;
</script>

<style>
a {
  text-decoration: none;
  color: black !important;
}
</style>
