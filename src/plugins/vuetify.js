import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import Calendar from "./../components/Icons/Calendar.vue";

Vue.use(Vuetify);

const opts = {};

export default new Vuetify({
  rtl: true,
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#9e664f",
        secondary: "#fed9c7",
      },
    },
  },
  icons: {
    iconfont: "mdi",
    values: {
      Calendar: {
        component: Calendar,
      },
    },
  },
});
