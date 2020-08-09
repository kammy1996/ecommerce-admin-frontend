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
                  ><v-icon>mdi-plus</v-icon> New Product</v-btn
                ></a
              >
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <v-card class="mx-auto" max-width="400">
              <v-img
                class="white--text align-end"
                src="../../assets/images/product/bike-product.png"
              ></v-img>
              <v-divider></v-divider>
              <v-card-title>Colnago Bike</v-card-title>
              <v-card-subtitle class="pb-1">Bikes</v-card-subtitle>

              <v-card-title>
                &#8377; 50000
                <v-chip class="ma-2" color="red" text-color="white"
                  >10% Off</v-chip
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
export default {
  components: {
    Sidebar,
  },
};
</script>

<style></style>
