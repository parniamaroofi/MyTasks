<template>
  <div class="app">
    <main class="main">
      <div>
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "DefaultContainer",
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.app {
  .main {
    height: 100vh;
    background-color: #fff;
    @media only screen and (min-width: 768px) {
      width: 400px;
      margin: 0 auto;
    }
    @media only screen and (max-width: 768px) {
      width: 100vw;
      margin: 0;
    }
  }
}
</style>
