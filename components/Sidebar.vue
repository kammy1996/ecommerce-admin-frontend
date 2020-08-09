<template>
  <v-card class="mx-auto overflow-hidden" height="auto">
    <v-app-bar color="blue" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <!-- Slot for Page title -->
        <slot name="title"></slot>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-img
        class="ma-2"
        src="../assets/images/ER-logo.png"
        width="80%"
      ></v-img>

      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <a href="/dashboard">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
          </a>
          <a href="/">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-package</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Product</v-list-item-title>
            </v-list-item>
          </a>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-file-document</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Order</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-filter-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Preferences</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-container fluid>
      <!-- actual pages  -->
      <slot name="page"></slot>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
  }),
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
