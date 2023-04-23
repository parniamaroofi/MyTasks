import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer");

// Pages
const Main = () => import("@/views/Main");

// Shared Pages
// const Page404 = () => import("@/views/Page404");

export default new Router({
  mode: "history", // https://router.vuejs.org/api/#mode
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      redirect: "/main",
      name: "Main",
      component: DefaultContainer,
      children: [
        {
          path: "/main",
          name: "Main",
          component: Main,
        },
      ],
    },

    // { path: "*", component: Page404 },
  ],
});
