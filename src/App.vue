<template>
  <v-app style="background-color: #f5f5f5">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang="scss">
// Import Main styles for this application
@import "assets/css/index.css";
@import "assets/scss/style.scss";

@font-face {
  font-family: Mulish;
  src: url("assets/fonts/Mulish-Light.ttf");
}

body {
  font-family: Mulish !important;
}
</style>
