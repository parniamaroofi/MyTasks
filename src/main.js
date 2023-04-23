import Vue from "vue";
import App from "./App";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});

import Notifications from "vue-notification";
Vue.use(Notifications);

import vuetify from "@/plugins/vuetify"; // path to vuetify export

//repeated data and methods imported here
Vue.mixin({
  data() {
    return {};
  },
  methods: {
    toast(message, type) {
      this.$toast[type](message, {
        position: type == "success" ? "top-left" : "top-center",
        icon: false,
        closeButton: false,
        timeout: 3000,
      });
    },
  },
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  data: {},
  router,
  template: "<App/>",
  components: {
    App,
  },
  vuetify,
  mounted() {},
});
