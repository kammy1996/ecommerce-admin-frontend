<template>
  <sidebar>
    <h3 slot="title">Products</h3>
    <v-main slot="page">
      <v-container>
        <v-row>
          <h1>this is Product page</h1>
        </v-row>
      </v-container>
    </v-main>
  </sidebar>
</template>

<script>
import Sidebar from "../../components/Sidebar";
export default {
  components: {
    Sidebar
  }
};
</script>

<style></style>
