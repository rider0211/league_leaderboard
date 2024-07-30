<template>
  <div id="app" class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-grow">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style>
/* Add any global styles if necessary */
body, html, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Open Sans', sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.flex-grow {
  flex-grow: 1;
}
</style>