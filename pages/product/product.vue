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
              <a href="addProduct">
                <v-btn color="primary"
                  ><v-icon>mdi-plus</v-icon> New Product
                </v-btn></a
              >
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3" v-for="(product, index) in products" :key="index">
            <v-card class="mx-auto" max-width="400">
              <v-img
                class="white--text align-end"
                src="../../assets/images/product/bike-product.png"
              ></v-img>
              <v-divider></v-divider>
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-subtitle class="pb-1">Bikes</v-card-subtitle>

              <v-card-title>
                &#8377; {{ product.price }}
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
import Sidebar from "../../components/Sidebar";
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
  mounted() {
    axios
      .get("api/product/show")
      .then((res) => (this.products = res.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style></style>
