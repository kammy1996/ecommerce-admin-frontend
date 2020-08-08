<template>
  <sidebar>
    <h3 slot="title">Dashboard</h3>
    <v-main slot="page">
      <v-container>
        <v-row>
          <h1>Primary Dashboard Create Later</h1>
        </v-row>
      </v-container>
    </v-main>
  </sidebar>
</template>

<script>
import Sidebar from "../components/Sidebar";
export default {
  components: {
    Sidebar
  }
};
</script>
